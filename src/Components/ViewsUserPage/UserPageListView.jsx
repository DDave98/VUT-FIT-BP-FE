// this page custom components

// General components
import Pagination from '../Pagination';
import ViewTypeSelect from '../ViewTypeSelect';

// other components
import { useState, useEffect } from "react";
import { usePublicApi } from '../../Hooks/usePublicAPI';
import { apiPath } from '../ProfilePage/Profile-Import';
import UserPageFilterPanel from './UserPageFilterPanel';

const UserPageListView = (
{
    showDetail,
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

    const [loadMode, setLoadMode] = useState(false);
    const [actualPage, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const TableElement = <></>;
    const GridElement = <></>;
    const [showTable, setShowTable] = useState(true);
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    const LoadUserList = async () =>
    {

    }

    const SetNewFilters = () =>
    {

    }

    const ApplyFilters = async () =>
    {

    }

    const GetFiltredData = async () =>
    {

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
        LoadUserList();
    }, []);

    return (
        <div className='UserPageListView'>

            {/* <!-- Filter panel --> */}
            <UserPageFilterPanel />

            <>custom table/grid</>

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

export default UserPageListView;