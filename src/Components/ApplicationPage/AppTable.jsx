import WindowTable from "../Tables/WindowTable";
import AppPageTableRow from "./AppPageTableRow";


const AppWindowTable = ({data, headers, onClick, onJoin, onLeave}) => 
{
    return (
        <WindowTable headers={headers}>
        {
            data.map((line, key) => (
                <AppPageTableRow 
                    line={line}
                    key={key}
                    onDetailClick={onClick}
                    onJoinClick={onJoin}
                    onLeaveClick={onLeave}
                />
            ))
        }
        </WindowTable>
    );
}

export default AppWindowTable;