import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Auth from "./Auth";

const ListHeader = ({ listName, getData }) => {
    const [ cookies, setCookies, removeCookies ] = useCookies(null)
    const [ authModal, setAuthModal ] = useState(false)

    const authToken = cookies.AccessToken
    const username = cookies.Username
    const signOut = () => {
        removeCookies('Username')
        removeCookies('AccessToken')
        removeCookies('RefreshToken')
        window.location.reload()
    }

    const [ showModal, setShowModal ] = useState(false)

    return (<div className="list-header">
        <h1 className="list-name">{ listName }</h1>
        <div className="button-container">
            { authToken && <h5 className="header-username">{ username }</h5> }
            <button className="create"
                    onClick={ () => {
                        setShowModal(true)
                    } }>ADD NEW
            </button>
            { authToken && <button className="signout"
                                   onClick={ signOut }>SIGN OUT </button> }
            { !authToken &&
                <button className="signout"
                        onClick={ () => {
                            setAuthModal(true)
                        } }>
                    LOG IN
                </button> }
        </div>
        { showModal && <Modal mode={ 'Create' }
                              setShowModal={ setShowModal }
                              getData={ getData }/> }
        { authModal && <Auth setAuthModal={ setAuthModal }
                             getData={ getData }/> }


    </div>);
}

export default ListHeader;
