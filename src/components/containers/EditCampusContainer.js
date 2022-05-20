import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      description: "", 
      address: "",
      imageUrl: null,
      redirect: false, 
      redirectId: null
    };
  }

  componentDidMount() {
    //getting campus ID from url
    this.handleInit(this.props.match.params.id);
  }

  handleInit = async campusId => {
    await this.props.fetchCampus(campusId);
    this.setState({
        name: this.props.campus.name,
        description: this.props.campus.description, 
        address: this.props.campus.address,
        imageUrl: this.props.campus.imageUrl,
        redirectId: this.props.campus.id
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

    let campus = {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        imageUrl: this.state.imageUrl,
        id: this.state.redirectId
    };
    
    // Update student in back-end database
    await this.props.editCampus(campus);

    // Update state, and trigger redirect to updated campus
    this.setState({
      name: "", 
      description: "", 
      address: "",
      redirect: true,
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render edit campus input form
  render() {
    // Redirect to updated campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.state}      
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      campus: state.campus,  // Get the State object from Reducer "campus"
    };
  };

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);