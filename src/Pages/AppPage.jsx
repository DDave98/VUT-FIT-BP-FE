import ModalDetail from "../Components/Modal-Detail";
import Pagination from '../Components/Pagination';
import ViewTypeSelect from '../Components/ViewTypeSelect';
import { useState } from "react";
import AppWindowGrid from "../Components/ApplicationPage/AppWindowGrid";
import AppWindowTable from "../Components/ApplicationPage/AppTable";
import AppFilterWindow from "../Components/ApplicationPage/AppFilter";
import ButtonSecondary from "../Components/Elements/Buttons/ButtonSecondary";

const AppPage = () =>
{
    const [showModal, setShowModal] = useState(false);
    const [showTable, setShowTable] = useState(true);

    const handleCloseModal = () =>
    {
        setShowModal(false);
    };

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
        },
        {
            name:  " ",
            class: "col-5"
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

    const TableElement = <AppWindowTable data={data} headers={headers} onClick={() => setShowModal(true)}/>;
    const GridElement = <AppWindowGrid data={data} onClick={() => setShowModal(true)} />;

    return (
        <div className='UserPage'>
            
            <div className="FlexSpaceBetween">
                <h1>Aplikace</h1>
                <ButtonSecondary text="Přidat Nový"/>
            </div>

            <AppFilterWindow />

            {/* <!-- Table of content --> */}
            { showTable ? TableElement : GridElement }
        
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}

                    <Pagination totalPages={totalPages} />
                    
                    {/* <!-- show style --> */}
                    <div className="show-style">
                        <ViewTypeSelect setShowType={setShowTable} />
                    </div> 
                </div>
            </div>

            

            <ModalDetail show={showModal} onClose={handleCloseModal} header="Detail Aplikace" />
        </div>
    );
}

export default AppPage;