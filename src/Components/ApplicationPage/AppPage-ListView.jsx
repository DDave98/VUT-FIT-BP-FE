
import Pagination from '../Pagination';
import ViewTypeSelect from '../ViewTypeSelect';
import { useState } from "react";
import AppWindowGrid from "../ApplicationPage/AppWindowGrid";
import AppWindowTable from "../ApplicationPage/AppTable";
import AppFilterWindow from "../ApplicationPage/AppFilter";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";

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

const totalPages = 20;

// zobrazení všech aplikací
const AppPageListView = (
{
    showDetail,
    showNew
}) =>
{
    const [showTable, setShowTable] = useState(true);
    const TableElement = <AppWindowTable data={data} headers={headers} onClick={showDetail}/>;
    const GridElement = <AppWindowGrid data={data} onClick={showDetail} />;

    return (
        <div className='UserPageListView'>
            
            <div className="FlexSpaceBetween">
                <div></div>
                <ButtonSecondary text="Přidat Nový" onClick={showNew}/>
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
        </div>
    );
}

export default AppPageListView;