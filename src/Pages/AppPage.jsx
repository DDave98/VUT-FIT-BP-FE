import Dropdown from "../Components/Dropdown";
import ModalDetail from "../Components/Modal-Detail";
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import TableView from '../Components/TableView';
import ViewTypeSelect from '../Components/ViewTypeSelect';
import { useState } from "react";

const AppPage = () =>
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
            name: "Vlastník",
            class: "col-10"
        },
        {
            name: "Dostupnost",
            class: "col-10"
        },
        {
            name:  "Počet členů",
            class: "col-10"
        }
    ];

    const data = [
        { 
            name: "Aplikace 1",
            owner: "Alfreds Futterkiste",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 2",
            owner: "Berglunds snabbkop",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 3",
            owner: "Koniglich Essen",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 4",
            owner: "Laughing Bacchus Winecellars",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 5",
            owner: "Magazzini Alimentari Riuniti",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 6",
            owner: "North South",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 7",
            owner: "Paris specialites",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 8",
            owner: "Paris specialites",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 9",
            owner: "Paris specialites",
            visibility: "soukromé", 
            users_cnt: 50,
        },
        { 
            name: "Aplikace 10",
            owner: "Paris specialites",
            visibility: "veřejné", 
            users_cnt: 50,
        },
    ];

    const filters = {
        apps: ["Vše", "Moje", "Přihlášené", "Spravované"],
        sort: headers.map((opt) => (opt.name)),
        directions: ["Vzestupně", "Sestupně"],
        type: ["Vše", "Hry", "Grafické nástroje", "Programovací nástroje", "Ostatní"]
    }
    
    return (
        <div className='UserPage'>
            <h1>Aplikace</h1>

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
                            <label for="cars">řadit podle:</label>
                            <select name="cars" id="cars">
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
                        
                        {/* <!-- řazeni podle typu --> */}
                        <div className="sorting-dropdown">
                        <label for="cars">Typ Aplikace:</label>
                            <select name="cars" id="cars">
                                {
                                    filters.type.map((opt) => (
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
                        headers.map((col) =>
                        (
                            <th className={col.class}>{col.name}</th>
                        ))
                    }
                    <th className="col-5"></th>
                </tr>
                {
                    data.map((line) => (
                        <tr>
                            <td>{line.name}</td>
                            <td>{line.owner}</td>
                            <td>{line.visibility}</td>
                            <td>{line.users_cnt}</td>
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

            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Aplikace" />
        </div>
    );
}

export default AppPage;