/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, handleDelete} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img style={{width:'10%', borderRadius:'50%'}} src={campus.imageUrl ? campus.imageUrl : "https://i.imgur.com/srY1LWf.jpg"} alt="" />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {!campus.students.length && <h3>No Students Enrolled</h3>}
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
      <button className="btn" onClick={() => handleDelete(campus.id)}>Delete</button>
      <br />
      <br />
      <Link to={`/editcampus/${campus.id}`}>
            <button className="btn">Edit Campus</button>
      </Link>
    </div>
  );
};

export default CampusView;