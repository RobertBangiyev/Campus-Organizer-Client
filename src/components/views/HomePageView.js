/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <h2>Welcome to our campus management system!</h2>
      <img className="home_img" src="https://s29068.pcdn.co/wp-content/uploads/68th-street-campus-768x432.jpg" alt="campusimg" />
    </div>
  );    
}

export default HomePageView;