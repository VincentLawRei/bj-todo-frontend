import ListHeader from "./Components/ListHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import ListItem from "./Components/ListItem";
import { useCookies } from "react-cookie";
import Pagination from "./Components/Pagination";

const App = () => {
    const [ tasks, setTasks ] = useState([])

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

    useEffect(() => {
        getData()
    }, [])

    const sortedTasks = tasks?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="app">
            <ListHeader listName={ 'TODO List' }
                        getData={ getData }/>
            { currentTasks?.map((task) => <ListItem key={ task.id }
                                                    task={ task }
                                                    getData={ getData }/>) }
            <Pagination tasksPerPage={ tasksPerPage }
                        totalTasks={ tasks.length }
                        paginate={ paginate }
                        currentPage={ currentPage }/>
        </div>
    );
}

export default App;
