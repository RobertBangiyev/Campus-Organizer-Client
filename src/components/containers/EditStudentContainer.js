import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageUrl: null,
      gpa: null,
      redirect: false, 
      redirectId: null,
      errorMsg: null
    };
  }

  componentDidMount() {
    //getting student ID from url
    this.props.fetchAllCampuses();
    this.handleInit(this.props.match.params.id);
  }

  handleInit = async studentId => {
    await this.props.fetchStudent(studentId);
    this.setState({
        firstname: this.props.student.firstname,
        lastname: this.props.student.lastname, 
        campusId: this.props.student.campusId,
        email: this.props.student.email,
        imageUrl: this.props.student.imageUrl,
        gpa: this.props.student.gpa,
        redirectId: this.props.student.id
    });
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let contSubmit = false;
    let formCampusId = this.state.campusId;


    if(!formCampusId) {
        contSubmit = true;
        formCampusId = null;
    }

    if(!contSubmit) {
        for(let i of this.props.allCampuses) {
            if(i.id == this.state.campusId) {
                contSubmit = true;
                break;
            }
        }
    }
    if(!contSubmit) {
        this.setState({
            errorMsg: "Invalid Campus ID: Campus does not exist"
        });
    }
    else {
        let student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: formCampusId,
            email: this.state.email,
            imageUrl: this.state.imageUrl,
            gpa: this.state.gpa,
            id: this.state.redirectId
        };

    
    
        // Update student in back-end database
        await this.props.editStudent(student);

        // Update state, and trigger redirect to updated student
        this.setState({
            firstname: "", 
            lastname: "", 
            campusId: null,
            email: "",
            redirect: true,
        });
    }
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render edit student input form
  render() {
    // Redirect to updated student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.state}
          errorMsg={this.state.errorMsg}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      student: state.student,  // Get the State object from Reducer "student"
      allCampuses: state.allCampuses
    };
  };

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);