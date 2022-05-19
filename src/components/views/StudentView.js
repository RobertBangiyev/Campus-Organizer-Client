/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";


const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.email}</h3>
      {student.campus && <Link to={`/campus/${student.campusId}`}>
            <h2>{student.campus.name}</h2>
      </Link>}
      {!student.campus && <h3>Not enrolled in any colleges</h3>}
    </div>
  );

};

export default StudentView;