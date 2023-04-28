import { useState } from "react";
import { useEffect } from "react";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import DropDownSelect from "../Elements/DropDownSelect/DropDownSelect";
import SearchBar from "../Elements/SearchBar";
import SortingSelect from "../Elements/SortingSelect/SortingSelect";
import FilterWindow from "../Filters/FilterWindow";
import PerPage from "../PerPage";
import { apiPath } from "../ProfilePage/Profile-Import";

const AppFilterWindow = ({total=0, onPerPageChange, onFilterChange, onClick}) =>
{
    const [{colums, types, owners}, setFilters] = useState({colums:{}, types:{}, owners:{}});   // vstupní hodnoty pro filtery
    const [searchInput, setSearchInput] = useState("");                         // výstup z vyhledávacího pole
    const [showType, setShowType] = useState(0);                                // vztahy aplikace
    const [{orderBy, isAsc}, setOrder] = useState({orderBy:0, isAsc:true});     // řazení záznamů
    const [appType, SetAppType] = useState(0);                                  // typy aplikace
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();        

    const LoadFilters = async () =>
    {
        const errorMessage = "Chyba při načístání filtrů";
        const errorTitle = "Nelze načíst hodnoty pro filtrování";
        const error = GenerateError(errorMessage, errorTitle);
        const params = GenerateParams(apiPath.ApplicationPath.Filters);
        const response = await SendRequest(params, error);
        if(response != undefined) setFilters(response.data);
    }

    useEffect(() => 
    {
        LoadFilters(); // načtení filtrů
    }, []);

    useEffect(() => 
    {   // aktualizace dat v nadřazené komponentě
        onFilterChange({searchInput, showType, orderBy, isAsc, appType});
    }, [searchInput, showType, orderBy, isAsc, appType]);

    return (
        <>
            <FilterWindow> 
                <div className="FlexRow">
                    <SearchBar onChange={setSearchInput} />
                    <ButtonSecondary text="Aplikovat Filtry" onClick={onClick} />
                </div>
                <div className="sorting">

                    <SortingSelect 
                        options={colums}
                        setSelected={() => {}}
                        setDirection={null} 
                    />

                    <DropDownSelect 
                        options={types}
                        label="Typ:"
                        onSelectedChange={SetAppType}
                        name="AppTypeSelect"
                    />

                    <DropDownSelect 
                        options={owners}
                        label="Aplikace:"
                        onSelectedChange={() => {}}
                        name="AppSelect"
                    />
                </div>
                
                <div className="panel-bottom">
                    <div className="SearchCounter">
                        počet výsledků: <p>{total}</p>
                    </div>
                    <PerPage onChange={onPerPageChange} />
                </div>   
            </FilterWindow>
        </>
    );
}

export default AppFilterWindow;