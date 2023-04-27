import WindowTable from "../Tables/WindowTable";

const AppWindowTable = ({data, headers, onClick}) => 
{
    return (
        <WindowTable headers={headers}>
        {
            data.map((line, key) => (
                <tr key={key}>
                    <td>{line.name}</td>
                    <td>{line.owner.name + " " + line.owner.surname}</td>
                    <td>{line.isPublic ? "Veřejné" : "Soukromé"}</td>
                    <td>{line.type}</td>
                    <td>{"?"}</td>
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