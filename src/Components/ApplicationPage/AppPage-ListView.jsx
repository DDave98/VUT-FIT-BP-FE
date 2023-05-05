
import Pagination from '../Pagination';
import ViewTypeSelect from '../ViewTypeSelect';
import { useState, useEffect } from "react";
import AppWindowGrid from "../ApplicationPage/AppWindowGrid";
import AppWindowTable from "../ApplicationPage/AppTable";
import AppFilterWindow from "../ApplicationPage/AppFilter";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import { usePublicApi } from '../../Hooks/usePublicAPI';
import { apiPath } from '../ProfilePage/Profile-Import';

// načtení listu aplikací se základním filterem
const AppPageListView = (
{
    showDetail,
    showNew
}) =>
{
    const [{data, total, pages, headers}, setResponse] = useState({data:[], total: 0, pages: 0, headers: []});
    
    // aktuální potvrzený a používaný filtr
    const [actualFilters, setActualFilters] = useState({
        "searchInput": "",
        "showType": 0,
        "orderBy": 0,
        "orderByAsc": true,
        "appType": 0,
        "pageNum": 1,
        "onPage": 10
    });

    // aktualizace nastavení parametru filtru z komponenty
    const [{searchInput, showType, orderBy, isAsc, appType}, setFilters] = useState(
    {
        searchInput: "", 
        showType: 0, 
        orderBy: 0, 
        isAsc: true, 
        appType: 0
    });

        // přihlásit uživatele do aplikace
        const handlJoinClick = async (AppId) =>
        {
            if (loadMode) return;
    
            setLoadMode(true);
            const headers = [AppId]
            const errorMessage = "Uživatel je členem aplikace";
            const errorTitle = "Nelze se přidat do aplikace";
            const error = GenerateError(errorMessage, errorTitle);
            const params = GenerateParams(apiPath.AppUsrPath.add, null, headers);
            const response = await SendRequest(params, error);
            if(response != undefined) 
            {
                await GetFiltredData();
                return true;
            }
            setLoadMode(false);
            return false;
        }

        const handlLeaveClick = async (AppId) =>
        {
            if (loadMode) return;
    
            setLoadMode(true);
            const headers = [AppId]
            const errorMessage = "Uživatel není členem aplikace";
            const errorTitle = "Nelze odebrat uživatele do aplikace";
            const error = GenerateError(errorMessage, errorTitle);
            const params = GenerateParams(apiPath.AppUsrPath.leave, null, headers);
            const response = await SendRequest(params, error);
            if(response != undefined) 
            {
                await GetFiltredData();
                return true;
            }
            setLoadMode(false);
            return false;
        }
    
    const [loadMode, setLoadMode] = useState(false);
    const [actualPage, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [showTable, setShowTable] = useState(true);
    const TableElement = <AppWindowTable data={data} headers={headers} onClick={showDetail} onJoin={handlJoinClick} onLeave={handlLeaveClick}/>;
    const GridElement = <AppWindowGrid data={data} onClick={showDetail} />;
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const loadAppList = async () =>
    {
        if(loadMode) return;

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

    const ApplyNewFilters = () =>
    {
        const filters = {
            "searchInput": searchInput,
            "showType": showType,
            "orderBy": orderBy,
            "orderByAsc": isAsc,
            "appType": appType,
            "pageNum": 1,
            "onPage": perPage
        };
        setActualFilters(filters);
    }

    const ApplyFilters = () =>
    {
        const filters = {
            "searchInput": searchInput,
            "showType": showType,
            "orderBy": orderBy,
            "orderByAsc": isAsc,
            "appType": appType,
            "pageNum": actualPage,
            "onPage": perPage
        };
        setActualFilters(filters);
    }

    const GetFiltredData = async () =>
    {   // změna stránky
        setLoadMode(true);
        const data = actualFilters;
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
        if (headers.length > 0) GetFiltredData();
    }, [actualFilters]);

    useEffect(() => 
    {
        if (headers.length > 0) ApplyFilters();
    }, [actualPage, perPage]);

    useEffect(() => 
    {
        loadAppList();
    }, []);

    return (
        <div className='AppPageListView'>
            
            <div className="FlexSpaceBetween">
                <div></div>
                <ButtonSecondary text="Přidat Nový" onClick={showNew}/>
            </div>

            <AppFilterWindow total={total} onClick={ApplyNewFilters} onFilterChange={setFilters} onPerPageChange={setPerPage} />

            {/* <!-- Table of content --> */}
            { showTable ? TableElement : GridElement }
        
            {/* <!-- Footer of page --> */}
            <div className="table-footer">
                <div className="table-footer-content">
                    
                    {/* <!-- pagination --> */}

                    <Pagination 
                        totalPages={pages} 
                        onChange={setPage} 
                        disabled={loadMode}
                        actualPage={actualFilters.pageNum}
                    />
                    
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