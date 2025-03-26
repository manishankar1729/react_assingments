// import * as Yup from 'yup';
// import { Formik, Form, ErrorMessage, Field } from "formik";

// const UserRegister = () => {
//     const initialValues = {
//         name: '',
//         age: '',
//     };

//     const validationSchema = Yup.object({
//         name: Yup.string()
//             .required("Name is required")
//             .min(3, "Name should be at least 3 characters")
//             .max(15, "Name should not exceed 15 characters"),
//         age: Yup.number()
//             .required("Age is required")
//             .min(18, "Age should be greater than 18")
//             .max(60, "Age should not exceed 60"),
//     });

//     return (
//         <div>
//             <h1>User Register</h1>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={(values) => {
//                     console.log("User Registration:", values);
//                 }}
//             >
//                 <Form>
//                     <div>
//                         <Field type="text" name="name" placeholder="Enter name" />
//                         <div style={{ color: 'red' }}>
//                             <ErrorMessage name="name" />
//                         </div>
//                     </div>
//                     <div>
//                         <Field type="number" name="age" placeholder="Enter age" />
//                         <div style={{ color: 'red' }}>
//                             <ErrorMessage name="age" />
//                         </div>
//                     </div>
//                     <button type="submit">Register</button>
//                 </Form>
//             </Formik>
//         </div>
//     );
// }

// export default UserRegister;
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";

const UserRegister = () => {
    const [userData, setUserData] = useState([]);

    const initialValues = {
        name: "",
        age: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name should be at least 3 characters")
            .max(15, "Name should not exceed 15 characters"),
        age: Yup.number()
            .required("Age is required")
            .min(18, "Age should be greater than 18")
            .max(60, "Age should not exceed 60"),
    });


    const handleSubmit = async (values) => {

        await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });


        fetchUserData();
    };


    const fetchUserData = async () => {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUserData(data);
    };


    useState(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <h1>User Register</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <Field type="text" name="name" placeholder="Enter name" />
                        <div style={{ color: "red" }}>
                            <ErrorMessage name="name" />
                        </div>
                    </div>
                    <div>
                        <Field type="number" name="age" placeholder="Enter age" />
                        <div style={{ color: "red" }}>
                            <ErrorMessage name="age" />
                        </div>
                    </div>
                    <button type="submit">Register</button>
                </Form>
            </Formik>

            <h2>Registered Users:</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.length > 0 ? (
                        userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No users registered yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserRegister;

