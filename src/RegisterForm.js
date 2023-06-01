import "./RegisterForm.css";
import React, { useState } from "react";
// Import Font Awesome Icon libraries.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck, faArrowLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [isMinLengthValid, setMinLengthValid] = useState(false);
  const [isDigitRequiredValid, setDigitRequiredValid] = useState(false);
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
    // Regular expression test for containing at least one digit.
    const hasDigitRequired = /\d/.test(value);

    // Check if password has been input, if not, placeholder will be default style.
    if (value)
      setPasswordHasInput(true);
    else 
      setPasswordHasInput(false);

    // Update state.
    setMinLengthValid(hasMinLength);
    setDigitRequiredValid(hasDigitRequired);
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
        <a className="returnBtn"><FontAwesomeIcon icon={faArrowLeft} /> Back</a>
        <form className="registerForm" onSubmit={handleFormSubmit}>
          <strong style={{fontSize: "18px"}}>Start from free</strong>
          <h2>Create an account</h2>
          <div className="flexContainer">
            <button className="snsBtn">
                <FontAwesomeIcon size="lg" icon={faGoogle} />
                <p>Sign up with Google</p>
            </button>
            <button className="snsBtn">
              <FontAwesomeIcon size="lg" icon={faFacebookF} />
              <p>Sign up with Facebook</p>
            </button>
          </div>

          <div 
            style={{
              display: "flex", 
              alignItems: "center", 
              marginBottom: "0.5rem",
              flex: 1
            }}
          >
            <strong style={{width: "100%"}}>Or use your email for registration</strong>
            <p className="splitLine"></p>
          </div>

          <div className="flexContainer">
            <div style={{position: "relative"}}>
              <input
                className="inputTextArea"
                type="text"
                name="firstName"
                placeholder="First Name"
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
                placeholder="Last Name"
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
              placeholder="E-mail"
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
              placeholder="Password"
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

          <div style={{marginTop: "-0.5rem", fontSize: "12px"}}>
            {
              isMinLengthValid ? 
              (<span><FontAwesomeIcon color="mediumaquamarine" icon={faCircleCheck} /> 8 Characters min.</span>) :
              (<span style={{color: "gray"}}><FontAwesomeIcon icon={faCircleCheck} /> 8 Characters min.</span>)
            }
            <span style={{ margin: "0 10px" }}></span>
            {
              isDigitRequiredValid ? 
              (<span><FontAwesomeIcon color="mediumaquamarine" icon={faCircleCheck} /> At least one digit.</span>) :
              (<span style={{color: "gray"}}><FontAwesomeIcon icon={faCircleCheck} /> At least one digit.</span>)
            }
          </div>

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

          <button type="submit" disabled={!formData.agreeTerms}>
            Create an Free Account!
          </button>

          <p style={{color: 'gray', textAlign: "center", margin: 0}}>Already have an account? <a href="#">Log in</a></p>
        </form>
      </div>
    </div>

  );
};

export default RegisterForm;