import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
    const editMode = mode === 'Edit'

    const [ cookies, setCookies, removeCookies ] = useCookies(null)
    const [ isChecked, setIsChecked ] = useState(task?.status || false)
    const [ error, setError ] = useState(true)
    const authToken = cookies.AccessToken


    const [ data, setData ] = useState({
        email: editMode ? task.email : "",
        username: editMode ? task.username : "",
        description: editMode ? task.description : "",
        status: editMode ? task.status : false
    })

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const config = {
        headers: { Authorization: `Bearer ${authToken}` }
    };

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'email') {
            if (!isValidEmail(e.target.value)) {
                setError('Email is invalid');
            } else {
                setError(false);
            }
        }

        setData(data => ({
            ...data, [name]: value,
        }))
    }

    const postData = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/todos/create`, {
                email: data.email,
                username: data.username,
                description: data.description,
                status: data.status
            })

            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        } catch (e) {

        }
    }

    const editData = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/todos/update/${ task.id }`, {
                email: data.email,
                username: data.username,
                description: data.description,
                status: data.status
            }, config)

            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        } catch (e) {

        }
    }

    return (<div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <div className="div">{ mode } task</div>
                <button onClick={ () => {
                    setShowModal(false)
                } }>X
                </button>
            </div>

            <form>
                { !editMode &&
                    <input required
                           maxLength={ 30 }
                           placeholder="Your email"
                           name="email"
                           value={ data.email }
                           onChange={ handleChange }/> }
                { !editMode &&
                    <input required
                           maxLength={ 30 }
                           placeholder="Your username"
                           name="username"
                           value={ data.username }
                           onChange={ handleChange }/> }
                <input required
                       maxLength={ 30 }
                       placeholder="Task description"
                       name="description"
                       value={ data.description }
                       onChange={ handleChange }/>
                { editMode &&
                    <div className="checkbox-container">
                        <input required
                               type="checkbox"
                               name="status"
                               checked={ isChecked }
                               id="checkbox"
                               onChange={ (e) => {
                                   setIsChecked(!isChecked)
                                   handleChange({
                                       target: {
                                           name: e.target.name,
                                           value: e.target.checked
                                       }
                                   })
                               } }/>
                        <label htmlFor="checkbox">Task Status</label>
                    </div> }

                { error && !editMode && <h4 className="modal-error">{ error }</h4> }
                <input className={ mode }
                       type="submit"
                       disabled={ error && !editMode }
                       onClick={ editMode ? editData : postData }/>
            </form>
        </div>

    </div>);
}

export default Modal;
