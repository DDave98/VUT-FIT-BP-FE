import "./Tables.css";

const WindowTable = ({headers, children}) =>
{

    return (
        <table className="WindowTable">
            <thead>
                <tr className="WindowTableHeader">
                {
                    headers.map((col, key) =>
                    (
                        <td key={key} className="col-10">{col}</td>
                    ))
                }
                    <th className="col-10">Detail</th>
                </tr>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    );

}

export default WindowTable;