const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
    const pageNumbers = [];
    console.log('[currentPage]:', currentPage)

    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                { pageNumbers.map((number) =>
                    <li key={ number }
                        className="page-item">
                        <a href="!#"
                           className={`page-link ${number === currentPage ? "active" : ""}`}
                           onClick={ () => paginate(number) }>{ number }</a>
                    </li>
                ) }
            </ul>
        </nav>
    );
}

export default Pagination;
