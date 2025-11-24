import './Signup.css'
import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_BASE;
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Signup() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [FormUsername, setFormUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {setUserId, setUsername, setToken, token, userId, userName} = useOutletContext();

    const handleSignup = async (e) => {
        e.preventDefault();
        // send new user details:
        try {
                const res = await axios.post(`${apiUrl}/user`, {
                    email,
                    password,
                    username: FormUsername,
                    firstname,
                    lastname
                });
                // Set local storage vars. When the Nav rerenders, this should take affect with these.
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.user.username);
                localStorage.setItem("userId", res.data.user.id);
                setToken(res.data.token);
                setUsername(res.data.user.username);
                setUserId(res.data.user.id)
                setErrorMessage(null)
                navigate("/home")
        } catch (err) {
            if (err.response) {
                // Server responded with a status code outside 2xx
                setErrorMessage(err.response.data.message);
            } else if (err.request) {
                // Request was made but no response
                setErrorMessage("No response from server.");
            } else {
                // Something else went wrong
                setErrorMessage("Unexpected error.");
            }

    }}

  return (
  <>
      <div className="signup-content">
        <h1>Sign Up to Blogrosoft</h1>
        <div className="signup-form-holder" onClick={(e) => e.stopPropagation()}>
                <h3>To comment on others' blogs or make your own blog posts, you must be registered.</h3>
                {errorMessage && <div className="errorMessageModal">{errorMessage}</div>}
                <form onSubmit={handleSignup}>
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={FormUsername}
                        required               
                        onChange={(e) => setFormUsername(e.target.value)} 
                    />
                    <label>First Name <span className="info">(optional)</span>:</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstname}                 
                        onChange={(e) => setFirstname(e.target.value)} 
                    />
                    <label>Last Name  <span className="info">(optional)</span>:</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastname}                 
                        onChange={(e) => setLastname(e.target.value)} 
                    />
                    <label>E-mail:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required                
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                     <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}   
                        required     
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
  
    </>
  )
}

export default Signup;