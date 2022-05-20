/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const {campuses, deleteCampus} = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return(
        <div>
        <p>There are no campuses.</p>
        <Link to={`newcampus`}>
          <button className="btn">Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <img className="pfp" style={{width:'10%', borderRadius:'50%'}} src={campus.imageUrl ? campus.imageUrl : "https://i.imgur.com/srY1LWf.jpg"} alt="" />
          <h4>Campus ID: {campus.id}</h4>
          <h4>Address: {campus.address}</h4>
          <h4>Description: {campus.description}</h4>
          <button className="btn" onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button className="btn">Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;