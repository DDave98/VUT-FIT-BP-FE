import {NotificationManager} from 'react-notifications';
import "../Styles/UserPage.css";
import Dropdown from '../Components/Dropdown';
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import TableView from '../Components/TableView';
import ViewTypeSelect from '../Components/ViewTypeSelect';
import ModalDetail from '../Components/Modal-Detail';
import { useState } from 'react';

const UserPage = () =>
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
            name: "Jméno",
            class: "col-10"
        },
        {
            name: "Příjmení",
            class: "col-10"
        },
        {
            name: "E-mail",
            class: "col-10"
        },
        {
            name:  "Role",
            class: "col-10"
        },
        {
            name:  "Počet Aplikací",
            class: "col-10"
        }
    ];

    const filters = {
        apps: ["Vše"].concat(Array.from({ length: 20 }, (value, index) => "Aplikace " + (index+1))),
        sort: headers.map((opt) => (opt.name)),
        directions: ["Vzestupně", "Sestupně"],
        type: ["Vše", "Hry", "Grafické nástroje", "Programovací nástroje", "Ostatní"]
    }

    const data = [
        { 
            name: "Alfreds",
            surname: "Futterkiste",
            email: "alaric.keeshawn@foundtoo.com", 
            role: "Uživatel",
            apps_cnt: 10,
        },
        { 
            name: "Berglunds",
            surname: "Snabbkop",
            email: "Berglunds.snabbkop@foundtoo.com", 
            role: "Uživatel",
            apps_cnt: 0,
        },
        { 
            name: "Koniglich",
            surname: "Essen",
            email: "Koniglich.Essen@foundtoo.com", 
            role: "Uživatel",
            apps_cnt: 0,
        },
        { 
            name: "Laughing Bacchus",
            surname: "Winecellars",
            email: "Laughing.Winecellars@foundtoo.com", 
            role: "Uživatel",
            apps_cnt: 0,
        },
        { 
            name: "Magazzini Alimentari",
            surname: "Riuniti",
            email: "Magazzini.Riuniti@foundtoo.com", 
            role: "Uživatel",
            apps_cnt: 0,
        },
        { 
            name: "North",
            surname: "South",
            email: "North.South@foundtoo.com", 
            role: "Admin",
            apps_cnt: 0,
        },
    ];
    
    return (
        <div className='UserPage'>
            <h1>Uživatelé</h1>

            {/* <!-- filter panel --> */}
            <div className="filter-panel">
                <div className="filter-panel-content">
                    
                    <h2>Filtry</h2>
                    
                    {/* <!-- searchbar --> */}
                    <input type="text" id="myInput" onkeyup="FilterBySearch()" placeholder="Hledat" title="Type in a name" />
                    
                    {/* <!-- Sorting --> */}
                    <div className="sorting">
                    
                    {/* <!-- vztah k aplikaci --> */}
                    <div className="sorting-dropdown">
                        <label for="cars">Aplikace:</label>
                        <select name="cars" id="cars">
                            {
                                filters.apps.map((opt) => (
                                    <option value={opt}>{opt}</option>
                                ))
                            }
                        </select>
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
                    
                    <div>
                        <label for="">blokovaní</label>
                        <input type="checkbox" />
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
                            <td>{line.name}</td>
                            <td>{line.surname}</td>
                            <td>{line.email}</td>
                            <td>{line.role}</td>
                            <td>{line.apps_cnt}</td>
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
                    
                    {/* <!-- show style --> */}
                    <div className="show-style">
                        <ViewTypeSelect />
                    </div> 
                </div>
            </div>

            {/* puvodni filtrpanel 
            {<div className='filterPanel w-full p-10 bg-slate-100'>
                <label for="cars">Aplikace:</label>
                <Dropdown />
            </div>} 

            

            <div className='DataPanel w-full p-10 bg-blue-100'>
                <TableView
                    data = {data}
                    onPage = {10}
                    page = {1}
                />
            </div>*/}
            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Uživatele"/>
        </div>
    );
}

export default UserPage;