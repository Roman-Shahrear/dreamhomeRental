import { useState } from "react";
import '../styles/Login.scss';
import { setLogin } from '../redux/state';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  // const [email, setEmail] = useState({});
  // const [password, setPassword] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch (`/api/auth/login`,{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      /*----- Get data after fetching -----*/
      const loggedIn = await response.json();

      if(loggedIn) {
        dispatch(setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        }))
        navigate('/');
      }
    } catch (err) {
        console.log(`Login failed`, err.message);
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input 
            type="email"
            id='email'
            placeholder="Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            required
          />
          <input 
            type="password"
            id='password'
            placeholder="**********"
            // value='password'
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            required
          />
          <button type='submit'>LOG IN</button>
        </form>
          <a href="/register">Don't have an account? Sign in Here</a>
      </div>
    </div>
  )
}

export default LoginPage
