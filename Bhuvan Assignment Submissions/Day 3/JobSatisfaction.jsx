import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const JobSatisfactionSurvey = () => {
  const [surveyData, setSurveyData] = useState([]);

  // Initial form values for job satisfaction survey
  const initialValues = {
    name: "",
    mobile: "",
    native: "",
    salary: "",
    job_satisfaction: "",
  };

  // Validation schema for job satisfaction survey form
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters"),
    mobile: Yup.string()
      .required("Mobile is required")
      .matches(/^[\d]{10}$/, "Mobile must be a 10 digit number"),
    native: Yup.string().required("Native field is required"),
    salary: Yup.string().required("Salary field is required"),
    job_satisfaction: Yup.number()
      .required("Job satisfaction is required")
      .min(1, "Job satisfaction must be between 1 and 5")
      .max(5, "Job satisfaction must be between 1 and 5"),
  });

  // Fetch survey data from json-server
  const fetchSurveyData = async () => {
    const response = await fetch("http://localhost:2000/data");
    const data = await response.json();
    setSurveyData(data); // Set the fetched data into state
  };

  // Fetch survey data when the component mounts
  useEffect(() => {
    fetchSurveyData(); // Fetch data from json-server
  }, []);

  // Handle form submission to add new survey entry
  const handleSubmit = async (values) => {
    const newSurvey = {
      ...values,
      id: surveyData.length + 1, // Automatically generate the next ID
    };

    // Send a POST request to json-server to add a new survey entry
    await fetch("http://localhost:2000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSurvey), // Send the form values along with the new id
    });

    // After submitting, fetch the updated list of survey data
    fetchSurveyData();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-5">Job Satisfaction Survey</h1>

      {/* Formik form */}
      <div className="card p-4 shadow-lg">
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
                placeholder="Enter Your Name"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="text"
                name="mobile"
                placeholder="Enter Your Mobile"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="mobile" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="text"
                name="native"
                placeholder="Your Native Location"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="native" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="number"
                name="salary"
                placeholder="Your Salary"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="salary" />
              </div>
            </div>

            <div className="mb-3">
              <Field
                type="number"
                name="job_satisfaction"
                placeholder="Job Satisfaction (1-5)"
                className="form-control"
              />
              <div className="text-danger">
                <ErrorMessage name="job_satisfaction" />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Submit Survey
            </button>
          </Form>
        </Formik>
      </div>

      {/* Displaying the list of survey responses */}
      <h2 className="text-center text-success mt-5">Survey Responses:</h2>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Native Location</th>
              <th>Salary</th>
              <th>Job Satisfaction</th>
            </tr>
          </thead>
          <tbody>
            {surveyData.length > 0 ? (
              surveyData.map((survey) => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.name}</td>
                  <td>{survey.mobile}</td>
                  <td>{survey.native}</td>
                  <td>{survey.salary}</td>
                  <td>{survey.job_satisfaction}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No survey responses yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobSatisfactionSurvey;
