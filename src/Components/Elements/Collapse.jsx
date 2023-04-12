import "../../Styles/Elements/Collapse.css";

/**
 * Komponenta - rozbalovací okno
 * @param {*} title nadpis na liště
 * @param {*} child obsah v rozbalovacím okně
 * @returns 
 */
const Collapse = ({title = "Nadpis", children}) =>
{
    return (
        <div className="wrap-collabsible">
            <input id="collapsible" className="toggle" type="checkbox" />
            <label htmlFor="collapsible" className="lbl-toggle">{title}</label>
            <div className="collapsible-content">
                <div className="content-inner">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Collapse;