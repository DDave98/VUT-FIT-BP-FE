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

const AppFilterWindow = ({total=0, onFilterChange, onClick}) =>
{
    const [filters, setFilters] = useState({colums:{}, types:{}, owners:{}});
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

    return (
        <>
            <FilterWindow> 
                <div className="FlexRow">
                    <SearchBar onChange={null} />
                    <ButtonSecondary text="hledat" />
                </div>
                <div className="sorting">

                    <SortingSelect 
                        options={filters.colums}
                        setSelected={null}
                        setDirection={null} />

                    <DropDownSelect 
                        options={filters.types}
                        label="Typ:"
                        onSelectedChange={null}
                        name="AppTypeSelect"
                        />

                    <DropDownSelect 
                        options={filters.owners}
                        label="Aplikace:"
                        onSelectedChange={null}
                        name="AppSelect"
                        />
                </div>
                
                <div className="panel-bottom">
                    <div className="SearchCounter">
                        počet výsledků: <p>{total}</p>
                    </div>
                    <PerPage />
                </div>   
            </FilterWindow>
        </>
    );
}

export default AppFilterWindow;