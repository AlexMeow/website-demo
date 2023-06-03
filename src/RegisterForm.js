import "./RegisterForm.css";
import React, { useState } from "react";
// Import Font Awesome Icon libraries.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebookF, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck, faArrowLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [isMinLengthValid, setMinLengthValid] = useState(false);
  const [isDigitAndLetterRequiredValid, setDigitAndLetterRequiredValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [eyeClicked, setEyeClicked] = useState(false);
  const [firstNameHasInput, setFirstNameHasInput] = useState(false);
  const [lastNameHasInput, setLastNameHasInput] = useState(false);
  const [emailHasInput, setEmailHasInput] = useState(false);
  const [passwordHasInput, setPasswordHasInput] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    agreeTerms: false,
  });

  const handleSnsBtnClick = (e) => {
    e.preventDefault();
  }

  // Triggered when user inputing something.
  const handleInputChange = (e) => {
    // Get user input and update state.
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // When input boxes are not empty, show little placeholder at left-top corner.
    if(e.target.value) {
      switch (e.target.name) {
        case "firstName":
          setFirstNameHasInput(true);
          break;
        case "lastName":
          setLastNameHasInput(true);
          break;
        case "email":
          setEmailHasInput(true);
          break;
        default:
      }
    }
    if(!e.target.value) {
      switch (e.target.name) {
        case "firstName":
          setFirstNameHasInput(false);
          break;
        case "lastName":
          setLastNameHasInput(false);
          break;
        case "email":
          setEmailHasInput(false);
          break;
        default:
      }
    }
  };

// Triggered when user inputing password.
  const handlePasswordChange = (e) => {
    // Get user input and update state.
    const value = e.target.value;
    setPassword(e.target.value);

    // Check if password is valid.
    const hasMinLength = value.length >= 8;
    // Regular expression test for containing at least one digit, one lower case and one upper case letter.
    const hasDigitAndLetterRequired = (/\d/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value));

    // Check if password has been input, if not, placeholder will be default style.
    if (value)
      setPasswordHasInput(true);
    else 
      setPasswordHasInput(false);

    // Update state.
    setMinLengthValid(hasMinLength);
    setDigitAndLetterRequiredValid(hasDigitAndLetterRequired);
  };

  // When checkbox has been checked, set agreeTerms as 'true'.
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, agreeTerms: checked }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    /* ============================================
     * Do something to handle submitted data here.
     * ============================================ */
  };

  // When password visibility button has been clicked, show password and change button icon.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeClicked(!eyeClicked);
  };

  // Render the register form.
  return (
    <div className="bg">
      <div className="mainRegion">
        <a className="returnBtn" href="#"><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
        <form className="registerForm" onSubmit={handleFormSubmit}>
          <div className="title" style={{textAlign: "center"}}>
            <h2>Create Your Account</h2>
            <p style={{marginTop: "0.5rem", color: "gray", fontSize: "14px"}}>Register a free account and get started!</p>
          </div>
          
          <div className="snsBtnContainer">
            <button className="snsBtn" onClick={handleSnsBtnClick}>
                <FontAwesomeIcon size="lg" icon={faGoogle} />
            </button>
            <button className="snsBtn" onClick={handleSnsBtnClick}>
              <FontAwesomeIcon size="lg" icon={faFacebookF} />
            </button>
            <button className="snsBtn" onClick={handleSnsBtnClick}>
              <FontAwesomeIcon size="lg" icon={faTwitter} />
            </button>
            <button className="snsBtn" onClick={handleSnsBtnClick}>
              <FontAwesomeIcon size="lg" icon={faLinkedin} />
            </button>
          </div>

          <h4 style={{textAlign: "center"}}>Or use your email for registration</h4>

          <div className="flexContainer">
            <div style={{position: "relative"}}>
              <input
                className="inputTextArea"
                type="text"
                name="firstName"
                placeholder="First Name..."
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {firstNameHasInput && <span className="miniPlaceholder">First Name</span>}
            </div>
            <div style={{position: "relative"}}>
              <input
                className="inputTextArea"
                type="text"
                name="lastName"
                placeholder="Last Name..."
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {lastNameHasInput && <span className="miniPlaceholder">Last Name</span>}
            </div>
          </div>

          <div style={{position: "relative"}}>
            <input
              className="inputTextArea"
              type="email"
              name="email"
              placeholder="E-mail..."
              value={formData.email}
              onChange={handleInputChange}
              style={{width: "100%"}}
            />
            {emailHasInput && <span className="miniPlaceholder">E-mall</span>}
          </div>

          <div className="inputPasswordArea">
            <input
              className="inputTextArea"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handlePasswordChange}
              required
              style={{width: "100%"}}
            />
            <FontAwesomeIcon
              style={{
                  position: "absolute",
                  zIndex: 1,
                  right: "1rem"
                }}
                size="lg"
                onClick={togglePasswordVisibility}
                icon={eyeClicked ? faEye : faEyeSlash}
                color={eyeClicked ? "#000000" : "#A0A0A0"}
            />
            {passwordHasInput && <span className="miniPlaceholder">Password</span>}
          </div>

          <div style={{marginTop: "-1rem", fontSize: "12px", textAlign: "center"}}>
            {
              isMinLengthValid ? 
              (<span><FontAwesomeIcon color="mediumaquamarine" icon={faCircleCheck} /> 8 Characters min.</span>) :
              (<span style={{color: "gray"}}><FontAwesomeIcon icon={faCircleCheck} /> 8 Characters min.</span>)
            }
            <span style={{ margin: "0 10px" }}></span>
            {
              isDigitAndLetterRequiredValid ? 
              (<span><FontAwesomeIcon color="mediumaquamarine" icon={faCircleCheck} /> At least one digit, one lower case and one upper case letter.</span>) :
              (<span style={{color: "gray"}}><FontAwesomeIcon icon={faCircleCheck} /> At least one digit, one lower case and one upper case letter.</span>)
            }
          </div>

          <div className="checkBoxContainer">
            <label style={{display: "flex", gap: "0.5rem"}}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleCheckboxChange}
              />
              Agree with <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>.
            </label>
            <label style={{display: "flex", gap: "0.5rem"}}>
              <input
                type="checkbox"
                name="agreeTerms"
              />
              I want to receive news and promotions by email.
            </label>
          </div>

          <button type="submit" disabled={!formData.agreeTerms}>
            Sign Up
          </button>

          <p style={{textAlign: "center", margin: 0}}>Already have an account? <a href="#">Log in</a>.</p>

          <p style={{color: "gray", fontSize: "12px", textAlign: "center", marginTop: "2rem"}}>
            <a href="https://www.freepik.com/free-vector/mesh-wireframe-sphere_849173.htm#query=fractal%20global%20Transparent&position=45&from_view=search&track=ais" target="_blank">Image by starline</a> on Freepik
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;