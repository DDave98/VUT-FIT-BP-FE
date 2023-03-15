import {NotificationManager} from 'react-notifications';
import "../Styles/LogPage.css";
import Dropdown from '../Components/Dropdown';
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import TableView from '../Components/TableView';
import ViewTypeSelect from '../Components/ViewTypeSelect';
import ModalDetail from '../Components/Modal-Detail';
import { useState } from 'react';

const MessagePage = () =>
{
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () =>
    {
        setShowModal(false);
    };

    const matchCount = 2000;
    const totalPages = 20;

    const headers = [
        {
            name: "Vytvořeno",
            class: "col-10"
        },
        {
            name: "Typ",
            class: "col-10"
        },
        {
            name: "Uživatel",
            class: "col-10"
        },
        {
            name:  "Aplikace",
            class: "col-10"
        },
        {
            name:  "IP",
            class: "col-10"
        }
        ,
        {
            name:  "Poznámka",
            class: "col-10"
        }
    ];

    const filters = {
        sort: headers.map((opt) => (opt.name)),
        directions: ["Vzestupně", "Sestupně"],
        type: ["Upozornění", "Informace", "Chyba"]
    }

    const data = [
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "18/2/2023 9:47:15",
            type: "Warning",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "13/3/2023 6:8:15",
            type: "Information",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
        { 
            created: "25/2/2023 6:52:55",
            type: "Error",
            user: "Dave", 
            app: "App 2",
            ip: "192.168.0.3",
            note: "Access denied",
        },
    ];
    
    return (
        <div className='LogPage'>
            <h1>Přehled Zpráv</h1>

            {/* <!-- filter panel --> */}
            <div className="filter-panel">
                <div className="filter-panel-content">
                    
                    <h2>Filtry</h2>
                    
                    {/* <!-- searchbar --> */}
                    <input type="text" id="myInput" onkeyup="FilterBySearch()" placeholder="Hledat" title="Type in a name" />
                    
                    {/* <!-- Sorting --> */}
                    <div className="sorting">

                        <div className="sorting-dropdown">
                            <label for="cars">Typ:</label>
                            <div id="list1" className="dropdown-check-list" tabindex="100">
                                <span className="anchor">Select</span>
                                <ul className="items">
                                <li><input className="checkbox" />warinng </li>
                                <li><input className="checkbox" />error</li>
                                <li><input className="checkbox" />info </li>
                                </ul>
                            </div>
                        </div>
                    
                    {/* <!-- řazeni podle sloupce --> */}
                    <div className="sorting-dropdown">
                        <label for="sort-col">řadit podle:</label>
                        <select name="sort-col" id="cars">
                            {
                                filters.sort.map((opt) => (
                                    <option value={opt}>{opt}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    {/* <!-- směr řazení --> */}
                    <div className="sorting-dropdown">
                        <label for="cars">směr řazení:</label>
                        <select name="cars" id="cars">
                            {
                                filters.directions.map((opt) => (
                                    <option value={opt}>{opt}</option>
                                ))
                            }
                        </select>
                    </div>

                    </div>
                    
                    <div className="panel-bottom">
                        <div className="SearchCounter">
                            počet výsledků: <p>150</p>
                        </div>
                        <PerPage />
                    </div>                
                </div>
            </div>

            {/* <!-- Table of content --> */}
            <table id="myTable">
                <tr className="table-header">
                    {
                        headers.map((col) =>(
                            <th className={col.class}>{col.name}</th>
                        ))
                    }
                    <th className="col-5"> </th>
                </tr>
                {
                    data.map((line) => (
                        <tr>
                            <td>{line.created}</td>
                            <td><div className={line.type + "Type"}>{line.type}</div></td>
                            <td>{line.user}</td>
                            <td>{line.app}</td>
                            <td>{line.ip}</td>
                            <td>{line.note}</td>
                            <td onClick={() => setShowModal(true)}>
                                možnosti
                            </td>
                        </tr>
                    ))
                }
            </table>
        
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Zprávy"/>
        </div>
    );
}

export default MessagePage;