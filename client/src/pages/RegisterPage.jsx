import "../styles/Register.scss";
import addImage from "../assets/addImage.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profilePicture" ? files[0] : value,
    });
  };

  console.log(formData);

  const [passwordMacth, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log(`Registration failed`, err.message);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const registerForm = new FormData();
  //     for (const key in formData) {
  //       registerForm.append(key, formData[key]);
  //     }

  //     const response = await axios.post('http://localhost:3001/api/auth/register', registerForm, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data', // Ensure correct content type for file uploads
  //       },
  //     });

  //     if (response.status === 200) {
  //       navigate('/login');
  //     }
  //   } catch (err) {
  //     console.log('Registration failed', err.message);
  //   }
  // };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="*********"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="**********"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {!passwordMacth && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          <input
            id="image"
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src={addImage} alt="addImage" />
            <p>Upload your photo</p>
          </label>
          {formData.profilePicture && (
            <img
              src={URL.createObjectURL(formData.profilePicture)}
              alt="profilepicture"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMacth}>
            Register
          </button>
        </form>
        <a href="/login">Allready have an account?Log in Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
