import WindowGrid from "../WindowGrid/WindowGrid";
import WindowGridElement from "../WindowGrid/WindowGridElement";
import "./AppWindowGrid.css";

const AppWindowGrid = ({data, onClick}) => 
{
    return (
        <WindowGrid>
        {
            data.map((line, key) =>
            (
                <WindowGridElement key={key}>
                    <div className="WGEHeader">
                        
                        {/* profile-image */}
                        <div className="WGEprofile">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
                        </div>

                        {/* name */}
                        <div className="card-name"><p>{line.name}</p></div>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">vlastník:</p>
                        <p className="WGEvalue">{line.owner.name + " " + line.owner.surname}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">viditelnost:</p>
                        <p className="WGEvalue">{line.isPublic ? "Veřejné" : "Soukromé"}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Počet členů:</p>
                        <p className="WGEvalue">{line.memberCount}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Typ aplikace:</p>
                        <p className="WGEvalue">{line.type}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Jsem členem:</p>
                        <p className="WGEvalue">{line.member ? "Ano" : "Ne"}</p>
                    </div>

                    {/* follow button */}
                    <div className="card-button">
                        {
                            line.canViewDetail ?
                            <button onClick={() => onClick(line.id)}>Detail aplikace</button>
                            : <></>
                        }
                        {
                            line.isPublic && !line.canViewDetail ? 
                            <button onClick={() => {/* přidání se do app */}} className="joinAppBtn">Připojit se</button>
                            : <></>
                        }
                    </div>
                </WindowGridElement>
            ))   
        }
        </WindowGrid>
    );
}

export default AppWindowGrid;