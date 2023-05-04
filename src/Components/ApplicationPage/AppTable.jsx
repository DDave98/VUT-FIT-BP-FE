import WindowTable from "../Tables/WindowTable";
import yesLogo from "../../Assets/Images/signIcons/no.png";
import noLogo from "../../Assets/Images/signIcons/checked.png";

const AppWindowTable = ({data, headers, onClick, onJoin}) => 
{
    const imgNo = <img src={yesLogo} alt="ne"></img>;
    const imgYes = <img src={noLogo} alt="ano"></img>; 

    return (
        <WindowTable headers={headers}>
        {
            
            data.map((line, key) => (
                <tr key={key}>
                    <td>{line.name}</td>
                    <td>{line.owner.name + " " + line.owner.surname}</td>
                    <td>{line.isPublic ? "Veřejné" : "Soukromé"}</td>
                    <td>{line.type}</td>
                    <td>{line.memberCount}</td>
                    <td>{line.member ? imgYes : imgNo}</td>
                    <td className="ActionTableCol">
                    {
                        line.canViewDetail ? 
                        <div onClick={() => onClick(line.id)}> přejít na detail </div>
                        : <></>
                    }
                    {
                        line.isPublic && !line.canViewDetail ? 
                        <div onClick={() => onJoin(line.id)}> Připojit se </div>
                        : <></>
                    }
                    {
                        line.canLeave ? 
                        <div onClick={() => {/* přidání se do app */}}> Opustit </div>
                        : <></>
                    }
                    </td>
                </tr>
            ))
        }
        </WindowTable>
    );
}

export default AppWindowTable;