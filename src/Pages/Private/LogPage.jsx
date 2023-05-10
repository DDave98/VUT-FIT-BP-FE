import "../../Styles/LogPage.css";
import Dropdown from '../../Components/Dropdown';
import Pagination from '../../Components/Pagination';
import PerPage from '../../Components/PerPage';
import TableView from '../../Components/TableView';
import ViewTypeSelect from '../../Components/ViewTypeSelect';
import ModalDetail from '../../Components/Modal-Detail';
import { useState } from 'react';
import FilterWindow from "../../Components/Filters/FilterWindow";
import SearchBar from "../../Components/Elements/SearchBar";
import ButtonSecondary from "../../Components/Elements/Buttons/ButtonSecondary";
import DropDownSelect from "../../Components/Elements/DropDownSelect/DropDownSelect";
import WindowTable from "../../Components/Tables/WindowTable";

const LogPage = () =>
{
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () =>
    {
        setShowModal(false);
    };

    const matchCount = 2000;
    const totalPages = 20;

    const headers = ["Vytvořeno", "Typ", "Uživatel", "Aplikace", "IP", "Poznámka"];

    const filters = {
        sort: headers,
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
            <h1>Záznamy Aktivit</h1>

            {/* <!-- filter panel --> */}
            <FilterWindow>
                <div className="FlexRow">
                    <SearchBar onChange={() => {}} />
                    <ButtonSecondary text="Aplikovat Filtry" onClick={() => {}} />
                </div>
                <div className="sorting">
                    <DropDownSelect 
                        options={{0:"warning", 1:"error", 2:"info"}}
                        label="Typ:"
                        onSelectedChange={() => {}}
                        name="AppTypeSelect"
                    />

                    <DropDownSelect 
                        options={filters.sort}
                        label="Řadit podle:"
                        onSelectedChange={() => {}}
                        name="AppTypeSelect"
                    />
                </div>
                <div className="panel-bottom">
                    <div className="SearchCounter">
                        počet výsledků: <p>{150}</p>
                    </div>
                    <PerPage onChange={() => {}} />
                </div>  
            </FilterWindow>

            {/* <!-- Table of content --> */}
            <WindowTable headers={headers}>
            {
                data.map((line, key) => (
                    <tr key={key}>
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
            </WindowTable>
                    
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Aktivity"/>
        </div>
    );
}

export default LogPage;