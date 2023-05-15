import ListHeader from "./Components/ListHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import ListItem from "./Components/ListItem";
import Pagination from "./Components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [ tasks, setTasks ] = useState([])
    const [ sortStatus, setSortStatus ] = useState({
        status: false, email: false
    })

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ tasksPerPage, setTasksPerPage ] = useState(3)

    const getData = async () => {
        try {
            const response = await axios.get(`${ process.env.REACT_APP_SERVER_URL }/todos/`)

            setTasks(response.data)
        } catch (e) {
            console.log('[e]:', e)
        }
    }

    const notify = (text) => toast.info(text);

    useEffect(() => {
        getData()
    }, [])

    // const sortedTasksByDate = tasks?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)

    const sortByStatus = () => {
        const mutatedTasks = [ ...tasks ]

        let sorted = mutatedTasks.sort((a, b) => (+a.status) - (+b.status) || a.username.localeCompare(b.username))

        if (sortStatus['status'] === false) {
            sorted = sorted.reverse()
        }

        const newSortStatus = {
            ...sortStatus, status: !sortStatus['status']
        }

        setTasks(sorted)
        setSortStatus(newSortStatus)
    }


    const sortByEmail = () => {
        const mutatedTasks = [ ...tasks ]

        let sorted = mutatedTasks.sort((a, b) => {
            return a.email.localeCompare(b.email, undefined, {
                sensitivity: "base", numeric: true
            })
        })

        if (sortStatus['email'] === false) {
            sorted = sorted.reverse()
        }

        const newSortStatus = {
            ...sortStatus, email: !sortStatus['email']
        }

        setTasks(sorted)
        setSortStatus(newSortStatus)
    }


    const sortByUsername = () => {
        const mutatedTasks = [ ...tasks ]

        let sorted = mutatedTasks.sort((a, b) => {
            return a.username.localeCompare(b.username, undefined, {
                sensitivity: "base", numeric: true
            })
        })

        if (sortStatus['username'] === false) {
            sorted = sorted.reverse()
        }

        const newSortStatus = {
            ...sortStatus, username: !sortStatus['username']
        }

        setTasks(sorted)
        setSortStatus(newSortStatus)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (<div className="app">
        <ListHeader listName={ 'TODO List' }
                    getData={ getData }
                    notify={ notify }/>
        <div className="filter-items">
            <button className="create filter"
                    onClick={ sortByUsername }>Sort by username
            </button>
            <button className="create filter"
                    onClick={ sortByEmail }>Sort by email
            </button>
            <button className="create filter"
                    onClick={ sortByStatus }>Sort by status
            </button>
        </div>
        <div className="list-items">
            { currentTasks?.map((task) => <ListItem key={ task.id }
                                                    task={ task }
                                                    getData={ getData }
                                                    notify={ notify }/>) }</div>
        <Pagination tasksPerPage={ tasksPerPage }
                    totalTasks={ tasks.length }
                    paginate={ paginate }
                    currentPage={ currentPage }/>
        <ToastContainer
            position="top-right"
            autoClose={ 2000 }
            hideProgressBar={ false }
            newestOnTop={ false }
            closeOnClick
            rtl={ false }
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>);
}

export default App;
