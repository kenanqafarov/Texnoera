import React, { useRef, useState } from "react";
import "./assets/style/form.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Form() {
  let users_list = JSON.parse(localStorage.getItem("userList")) || [];

  const nameRef = useRef(null);
  const surnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const specialityRef = useRef(null);

  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValue = emailRef.current.value;
    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError("Please enter a valid email");
      return;
    } else {
      setEmailError("");
    }

    const formData = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailValue,
      phone: phoneRef.current.value,
      speciality: specialityRef.current.value,
    };

    users_list.push(formData);
    localStorage.setItem("userList", JSON.stringify(users_list));

    Swal.fire({
      title: "Good job!",
      text: "You successfully registered!",
      icon: "success",
    });
    nameRef.current.value = "";
    surnameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    specialityRef.current.value = "";
  };

  return (
    <div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="title">Example Form</h1>
        <div className="username container">
          <p className="top-part">Name</p>
          <input type="text" placeholder="Your name" ref={nameRef} required />
        </div>
        <div className="surname container">
          <p className="top-part">Surname</p>
          <input
            type="text"
            placeholder="Your surname"
            ref={surnameRef}
            required
          />
        </div>
        <div className="email container">
          <p className="top-part">Mail</p>
          <input
            className="userEmail"
            type="email"
            placeholder="Your mail"
            ref={emailRef}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="phone container">
          <p className="top-part">Phone number</p>
          <input
            type="number"
            placeholder="Your phone"
            ref={phoneRef}
            required
          />
          <p className="desc">Optional - we never use this for marketing</p>
        </div>
        <div className="speciality container">
          <p className="top-part">Speciality</p>
          <select ref={specialityRef} required>
            <option value="">Select your speciality</option>
            <option value="Information Technologies expert">
              Information Technologies expert
            </option>
            <option value="Cybersecurity expert">Cybersecurity expert</option>
            <option value="Data Science specialist">
              Data Science specialist
            </option>
            <option value="Cloud Computing engineer">
              Cloud Computing engineer
            </option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Form;
