import yesLogo from "../../Assets/Images/signIcons/no.png";
import noLogo from "../../Assets/Images/signIcons/checked.png";
import { NotificationManager } from "react-notifications";

const AppPageTableRow = (
{
    line, onDetailClick, onJoinClick, onLeaveClick
}) =>
{
    const imgNo = <img src={yesLogo} alt="ne"></img>;
    const imgYes = <img src={noLogo} alt="ano"></img>; 

    const joinAppBtn = async () =>
    {
        const res = await onJoinClick(line.id);
        if (res) 
        {
            NotificationManager.success("Uživatel byl přidán");
            // změnit stav ....
        }
    }

    const leaveAppBtn = async () =>
    {
        const res = await onLeaveClick(line.id);
        if (res) 
        {
            NotificationManager.success("Uživatel byl odebrán");
            // změnit stav ....
        }
    }

    const detailButton = ( // mám oprávnění vidět detail
        line.canViewDetail ? 
        <div onClick={() => onDetailClick(line.id)}> přejít na detail </div>
        : <></>
    );

    const joinButton = ( // je veřejná A nejsem členem
        line.isPublic && !line.member ? 
        <div onClick={joinAppBtn}> Připojit se </div>
        : <></>
    );

    const leaveButton = ( // nejsem admin a jsem členem -> můžu opustit
        line.canLeave ? 
        <div onClick={leaveAppBtn}> Opustit </div>
        : <></>
    );

    return (
        <tr>
            <td>{line.name}</td>
            <td>{line.owner.name + " " + line.owner.surname}</td>
            <td>{line.isPublic ? "Veřejné" : "Soukromé"}</td>
            <td>{line.type}</td>
            <td>{line.memberCount}</td>
            <td>{line.member ? imgYes : imgNo}</td>
            <td className="ActionTableCol">
            {detailButton}
            {joinButton}
            {leaveButton}
            </td>
        </tr>
    );
}

export default AppPageTableRow;