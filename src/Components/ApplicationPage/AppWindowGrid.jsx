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
                        <p className="WGEvalue">{"?"}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Typ aplikace:</p>
                        <p className="WGEvalue">{line.type}</p>
                    </div>

                    {/* follow button */}
                    <div className="card-button">
                        <button onClick={() => onClick(line.id)}>více možností</button>
                    </div>
                </WindowGridElement>
            ))   
        }
        </WindowGrid>
    );
}

export default AppWindowGrid;