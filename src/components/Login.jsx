  import { useState, useEffect } from "react";
  import axios from "axios"
  import "./Login.css"
  import { useNavigate } from "react-router-dom";
 
  
function Login({ setShowLogin, setToken, setUsername, setUserId }) {
const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      console.log(res)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.username);
      localStorage.setItem("userId", res.data.user.id);
      setToken(res.data.token)
      setUsername(res.data.user.username)
      setUserId(res.data.user.id)
      setShowLogin(false)
      setErrorMessage()
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
            }}
    }

    return (
<div className="modal-overlay" onClick={() => setShowLogin(false)}>
            
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Sign in to Blogrosoft!</h3>
                {errorMessage && <div className="errorMessageModal">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}                 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}             
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>)}

export default Login