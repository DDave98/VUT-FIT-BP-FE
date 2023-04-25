import "./Tables.css";

const WindowTable = ({headers, children}) =>
{

    return (
        <table className="WindowTable">
            <tr className="WindowTableHeader">
            {
                headers.map((col) =>
                (
                    <th className={col.class}>{col.name}</th>
                ))
            }
            </tr>
            {children}
        </table>
    );

}

export default WindowTable;