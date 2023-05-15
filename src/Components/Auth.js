import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Auth = ({ setAuthModal, notify}) => {
    const [ cookies, setCookies] = useCookies(null)
    const [ error, setError ] = useState(false)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/auth/login`, {
                username, password
            })

            if (response.status === 200) {
                setError(false)
                setCookies('AccessToken', response.data.token)
                setCookies('RefreshToken', response.data.refreshToken)
                setCookies('Username', response.data.username)
                window.location.reload()
            }

        } catch (e) {
            if (e.response?.data?.message) {
                setError(e.response.data.message)
                notify(error)
            }
        }
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="auth-container">
                    <div className="auth-container-box">
                        <form>
                            <div className="auth-header">
                                <h2>LOG IN</h2>
                                <button onClick={ () => {
                                    setAuthModal(false)
                                } }>X
                                </button>
                            </div>
                            <input type="username"
                                   placeholder="Username"
                                   onChange={ (e) => {
                                       setUsername(e.target.value)
                                   } }/>
                            <input type="password"
                                   placeholder="Password"
                                   onChange={ (e) => {
                                       setPassword(e.target.value)
                                   } }/>
                            <input type="submit"
                                   className="create"
                                   value="Log In"
                                   onClick={ handleSubmit }/>
                            {/*{ error && <p>{ error }</p> }*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Auth;
