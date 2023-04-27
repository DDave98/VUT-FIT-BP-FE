import "./Tables.css";

const WindowTable = ({headers, children}) =>
{

    return (
        <table className="WindowTable">
            <tr className="WindowTableHeader">
            {
                headers.map((col, key) =>
                (
                    <th key={key} className="col-10">{col}</th>
                ))
            }
                <th className="col-10">Detail</th>
            </tr>
            {children}
        </table>
    );

}

export default WindowTable;