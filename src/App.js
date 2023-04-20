import "./styles.css";
import Position from "./position";
import Welcome from "./Welcome";
import Gender from "./gender";

import { useEffect, useState } from "react";

const genders = [
  { name: "Male", value: 1 },
  { name: "Female", value: 2 },
  { name: "Secret", value: 3 }
];

export default function App() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
    position: 1,
    gender: 1,
    agree: false
  });
  const [formError, setFormError] = useState({});
  const [submitBtnClick, setsubmitBtnClick] = useState(false);

  function handleValidation(event) {
    //only setForm or bind values to form
    if (event.target) {
      const { name } = event.target;
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setForm({ ...form, [name]: value });
    } else {
      //on click of span
      setForm({ ...form, gender: event });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    let err = validateForm(form);
    //setFormError({ ...formError, ...err });//not working
    setFormError(validateForm(form)); //this is  working
    setsubmitBtnClick(true);
  }

  useEffect(() => {
    console.log("formError", formError);
    if (Object.keys(formError).length === 0 && submitBtnClick) {
      console.log("send post api", form);
    }
  }, [formError, submitBtnClick, form]);

  function validateForm(form) {
    const errors = {};
    if (!form.firstName || form?.firstName?.length === 0) {
      errors.firstName = "Enter firstName";
    }

    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (form?.email?.length == 0) {
      errors.email = "Enter email";
    } else if (!emailPattern.test(form.email)) {
      errors.email = "Enter valid email";
    }

    if (form?.password == 0) {
      errors.password = "Enter password";
    }

    if (form.agree === false) {
      errors.agree = "Enter confirmation";
    }

    return errors;
  }

  return (
    <div className="App">
      <pre>{JSON.stringify(formError, undefined, 2)}</pre>
      <Welcome />

      <form onSubmit={handleSubmit} disabled="{true}">
        <div className="col-12">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleValidation}
            placeholder="Full Name"
            className="fullName"
          />
        </div>
        <p className="formError">{formError.firstName}</p>

        <div className="col-12">
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
            value={form.email}
            placeholder="Enter E-mail"
            className="email"
          />
        </div>
        <p className="formError">{formError.email}</p>

        <div className="col-12">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleValidation}
            placeholder="Enter Password"
            className="password"
          />
        </div>
        <p className="formError">{formError.password}</p>

        <div className="col-12">
          <Position onChangePosition={handleValidation} />
        </div>

        <div className="col-12">
          <Gender
            name="gender"
            value={form.gender}
            genders={genders}
            onSelectedGender={handleValidation}
          />
        </div>

        <div className="col-12">
          <input name="agree" type="checkbox" onChange={handleValidation} />
          <label> I confirm that all data are correct </label>
        </div>
        <p className="formError">{formError.agree}</p>

        <div className="col-12">
          <button className="registerBtn">Register</button>
        </div>
      </form>
    </div>
  );
}
