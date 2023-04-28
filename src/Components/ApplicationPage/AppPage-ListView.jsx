
import Pagination from '../Pagination';
import ViewTypeSelect from '../ViewTypeSelect';
import { useState } from "react";
import AppWindowGrid from "../ApplicationPage/AppWindowGrid";
import AppWindowTable from "../ApplicationPage/AppTable";
import AppFilterWindow from "../ApplicationPage/AppFilter";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import { usePublicApi } from '../../Hooks/usePublicAPI';
import { apiPath } from '../ProfilePage/Profile-Import';
import { useEffect } from 'react';

// načtení listu aplikací se základním filterem
const AppPageListView = (
{
    showDetail,
    showNew
}) =>
{
    const [{data, total, pages, headers}, setResponse] = useState({data:[], total: 0, pages: 0, headers: []});
    
    const [loadMode, setLoadMode] = useState(false);
    const [actualPage, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [showTable, setShowTable] = useState(true);
    const TableElement = <AppWindowTable data={data} headers={headers} onClick={showDetail}/>;
    const GridElement = <AppWindowGrid data={data} onClick={showDetail} />;
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const loadAppList = async () =>
    {
        setLoadMode(true);
        // načíst všechny providery
        const errorMessage = "Chyba při načístání záznamů";
        const errorTitle = "Nelze načíst záznamy";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.List);
        const response = await SendRequest(params, error);
        if(response != undefined) setResponse(response.data);
        setLoadMode(false);
    }

    const onPageChange = async () =>
    {   // změna stránky
        setLoadMode(true);
        const data = {
        "searchInput": "",
        "showType": 0,
        "orderBy": 0,
        "orderByAsc": true,
        "appType": 0,
        "pageNum": actualPage,
        "onPage": perPage
        };
        const errorMessage = "Chyba při načístání záznamů, špatný filtr";
        const errorTitle = "Nelze načíst záznamy";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.FiltredList, data);
        const response = await SendRequest(params, error);
        if(response != undefined)  setResponse(response.data);
        setLoadMode(false);
    }

    useEffect(() => 
    {
        onPageChange();
    }, [actualPage, perPage]);

    useEffect(() => 
    {
        loadAppList();
    }, []);

    return (
        <div className='UserPageListView'>
            
            <div className="FlexSpaceBetween">
                <div></div>
                <ButtonSecondary text="Přidat Nový" onClick={showNew}/>
            </div>

            <AppFilterWindow total={total} onClick={null} onPerPageChange={setPerPage} />

            {/* <!-- Table of content --> */}
            { showTable ? TableElement : GridElement }
        
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}

                    <Pagination totalPages={pages} onChange={setPage} disabled={loadMode}/>
                    
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