

const FilterWindow = ({children}) =>
{
    return (
        <>
            {/* <!-- filter panel --> */}
            <div className="filter-panel">
                <div className="filter-panel-content">
                    <h2>Filtry</h2>
                    {children}
                </div>
            </div>
        </>
    );
}

export default FilterWindow;