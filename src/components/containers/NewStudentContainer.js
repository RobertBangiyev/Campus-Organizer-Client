/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
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
    this.props.fetchAllCampuses();
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
        gpa: this.state.gpa
      };
    
      // Add new student in back-end database
      let newStudent = await this.props.addStudent(student);

      // Update state, and trigger redirect to show the new student
      this.setState({
        firstname: "", 
        lastname: "", 
        campusId: null,
        email: "",
        redirect: true, 
        redirectId: newStudent.id
      });
    }
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/students/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          errorMsg={this.state.errorMsg}      
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    })
}

const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,  // Get the State object from Reducer "allCampuses"
  };
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);