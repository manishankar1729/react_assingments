
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";

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
    <div>
      <h1>Customer Feedback</h1>

      {/* Formik form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field type="text" name="name" placeholder="Enter Your Name" />
            <div style={{ color: "red" }}>
              <ErrorMessage name="name" />
            </div>
          </div>

          <div>
            <Field type="email" name="email" placeholder="Enter Your Email" />
            <div style={{ color: "red" }}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div>
            <Field type="number" name="rating" placeholder="Rating (1-5)" />
            <div style={{ color: "red" }}>
              <ErrorMessage name="rating" />
            </div>
          </div>

          <div>
            <Field as="textarea" name="comments" placeholder="Enter your comments" />
            <div style={{ color: "red" }}>
              <ErrorMessage name="comments" />
            </div>
          </div>

          <button type="submit">Submit Feedback</button>
        </Form>
      </Formik>

      {/* Displaying the list of feedback */}
      <h2>Feedback List:</h2>
      <table border="1">
        <thead>
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
              <td colSpan="4">No feedback yet.</td>
            </tr>
          )}
        </tbody>
      </table>
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
