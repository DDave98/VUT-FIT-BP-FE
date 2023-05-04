import { useState, useEffect } from "react";
import { usePublicApi } from "../../Hooks/usePublicAPI";
import ButtonSecondary from "../Elements/Buttons/ButtonSecondary";
import DropDownSelect from "../Elements/DropDownSelect/DropDownSelect";
import SearchBar from "../Elements/SearchBar";
import SortingSelect from "../Elements/SortingSelect/SortingSelect";
import FilterWindow from "../Filters/FilterWindow";
import PerPage from "../PerPage";
import { apiPath } from "../ProfilePage/Profile-Import";


const UserPageFilterPanel = ({total=0, onPerPageChange, onFilterChange, onClick}) =>
{
    const [FilterValues, setFilters] = useState({});                            // vstupní hodnoty pro filtery
    const [searchInput, setSearchInput] = useState("");                         // výstup z vyhledávacího pole
    const [showType, setShowType] = useState(0);                                // vztahy aplikace
    const [{orderBy, isAsc}, setOrder] = useState({orderBy:0, isAsc:true});     // řazení záznamů
    const [appType, SetAppType] = useState(0);                                  // typy aplikace
    
    const [SendRequest, GenerateParams, GenerateError] = usePublicApi();

    /// načtení hodnot pro filtery
    const LoadFilters = async () =>
    {

    }

    useEffect(() => 
    {
        LoadFilters();
    }, []);

    useEffect(() => 
    {   // aktualizace dat v nadřazené komponentě
        // onFilterChange({searchInput, showType, orderBy, isAsc, appType});
    }, [searchInput, showType, orderBy, isAsc, appType]);
    
    return (
        <FilterWindow>
            <div className="FlexRow">
                <SearchBar onChange={setSearchInput} />
                <ButtonSecondary text="Aplikovat Filtry" onClick={onClick} />
            </div>

            <div className="sorting">
                <SortingSelect 
                    options={FilterValues?.columns}
                    setSelected={() => {}}
                    setDirection={null} 
                />

                <DropDownSelect 
                    options={FilterValues?.roles}
                    label="Role uživatele:"
                    onSelectedChange={() => {}}
                    name="UsrSelect"
                />

                <DropDownSelect 
                    options={FilterValues?.permissions}
                    label="Oprávnění uživatele:"
                    onSelectedChange={() => {}}
                    name="PermissionsSelect"
                />

                <DropDownSelect 
                    options={FilterValues?.apps}
                    label="Uživatelé Aplikace:"
                    onSelectedChange={() => {}}
                    name="AppSelect"
                />
            </div>
        </FilterWindow>
    );
}

export default UserPageFilterPanel;