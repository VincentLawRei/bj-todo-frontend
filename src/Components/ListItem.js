import OkeyIcon from "./OkeyIcon";
import { useState } from "react";
import Modal from "./Modal";
import NoIcon from "./NoIcon";
import axios from "axios";
import { useCookies } from "react-cookie";

const ListItem = ({ task, getData }) => {
    const [ showModal, setShowModal ] = useState(false)
    const [ cookies, setCookies, removeCookies ] = useCookies(null)
    const authToken = cookies.AccessToken

    const config = {
        headers: { Authorization: `Bearer ${ authToken }` }
    };

    const deleteItem = async () => {
        try {
            const response = await axios.delete(`${ process.env.REACT_APP_SERVER_URL }/todos/delete/${ task.id }`, config)

            if (response.status === 200) {
                getData()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="list-item">
            <div className="list-container">
                { task.status ? <OkeyIcon/> : <NoIcon/> }
                <div className="info-container">
                    <div className="task-email">Email: { task.email }</div>
                    <div className="task-username">Username: { task.username }</div>
                    <div className="task-description">Description: { task.description }</div>
                </div>
            </div>

            { authToken && <div className="button-container">
                <button className="edit"
                        onClick={ () => {
                            setShowModal(true)
                        } }>EDIT
                </button>
                <button className="delete"
                        onClick={ deleteItem }>DELETE
                </button>
            </div> }


            { showModal && <Modal mode={ "Edit" }
                                  setShowModal={ setShowModal }
                                  getData={ getData }
                                  task={ task }/> }
        </div>
    );
}

export default ListItem;
