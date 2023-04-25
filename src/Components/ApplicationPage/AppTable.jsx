import WindowTable from "../Tables/WindowTable";
import "./AppWGE.css";

const AppWindowTable = ({data, headers, onClick}) => 
{
    return (
        <WindowTable headers={headers}>
        {
            data.map((line) => (
                <tr>
                    <td>{line.name}</td>
                    <td>{line.owner}</td>
                    <td>{line.visibility}</td>
                    <td>{line.users_cnt}</td>
                    <td onClick={onClick}>
                        možnosti
                    </td>
                </tr>
            ))
        }
        </WindowTable>
    );
}

export default AppWindowTable;