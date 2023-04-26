import WindowTable from "../Tables/WindowTable";

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
                    <td onClick={() => onClick(line.name)}>
                        možnosti
                    </td>
                </tr>
            ))
        }
        </WindowTable>
    );
}

export default AppWindowTable;