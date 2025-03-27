import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Initial form values for feedback
  const initialValues = {
    name: "",
    email: "",
    rating: "",
    comments: "",
  };

  // Validation schema for feedback form
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    rating: Yup.number().min(1).max(5).required("Rating is required"),
    comments: Yup.string().required("Comments are required"),
  });

  // Handle feedback form submission
  const handleSubmit = async (values) => {
    // Send a POST request to json-server to add feedback data
    await fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    // After submitting, fetch the updated list of feedback
    fetchFeedbackData();
  };

  // Fetch feedback data from json-server
  const fetchFeedbackData = async () => {
    const response = await fetch("http://localhost:5000/feedback");
    const data = await response.json();
    setFeedbackData(data);
  };

  // Fetch feedback data when the component mounts
  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Customer Feedback</h1>

      {/* Formik form wrapped in a Bootstrap card */}
      <div className="card p-4 shadow-sm">
        <h2 className="card-title text-success mb-4">Provide Your Feedback</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Your Name"
              />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
              />
              <div className="text-danger">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="number"
                name="rating"
                className="form-control"
                placeholder="Rating (1-5)"
              />
              <div className="text-danger">
                <ErrorMessage name="rating" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                as="textarea"
                name="comments"
                className="form-control"
                placeholder="Enter your comments"
              />
              <div className="text-danger">
                <ErrorMessage name="comments" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
              Submit Feedback
            </button>
          </Form>
        </Formik>
      </div>

      {/* Displaying the list of feedback in a styled table */}
      <h2 className="mt-5 text-center text-primary">Feedback List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.length > 0 ? (
              feedbackData.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.name}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.rating}</td>
                  <td>{feedback.comments}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No feedback yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackForm;



// import * as yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// const UserRegister = () => {
//     const initialValues = {
//         name: "",
//         age: "",

//     };
//     const validationSchema = yup.object({
//         name: yup.string().required("Name is required").min(3, "Name should be atleast 3 characters").max(15, "Name must be most 15 characters"),
//         age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer")
//     });
//     return (
//         <div>
//             <h1>User Registration</h1>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={(values) => {
//                     console.log("User Registered", values);
//                 }}
//             >
//                 <Form>
//                     <div>
//                         <label htmlFor="name">Name</label>
//                         <Field type="text" id="name" name="name" />
//                         <div style={{ color: "red" }}>
//                             <ErrorMessage name="name" />
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="age">Age</label>
//                         <Field type="text" id="age" name="age" />
//                         <div style={{ color: "red" }}>
//                             <ErrorMessage name="age" />
//                         </div>
//                     </div>
//                     <button type="submit">Submit</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// }
// export default UserRegister;
