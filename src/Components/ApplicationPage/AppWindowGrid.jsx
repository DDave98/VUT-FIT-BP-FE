import WindowGrid from "../WindowGrid/WindowGrid";
import WindowGridElement from "../WindowGrid/WindowGridElement";
import "./AppWindowGrid.css";

const AppWindowGrid = ({data, onClick}) => 
{
    return (
        <WindowGrid>
        {
            data.map((obj) =>
            (
                <WindowGridElement>
                    <div className="WGEHeader">
                        
                        {/* profile-image */}
                        <div className="WGEprofile">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
                        </div>

                        {/* name */}
                        <div className="card-name"><p>{obj.name}</p></div>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">vlastník:</p>
                        <p className="WGEvalue">{obj.owner}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">viditelnost:</p>
                        <p className="WGEvalue">{obj.visibility}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Počet členů:</p>
                        <p className="WGEvalue">{obj.users_cnt}</p>
                    </div>
                    <div className="WGEline">
                        <p className="WGEname">Počet správců:</p>
                        <p className="WGEvalue">#</p>
                    </div>

                    {/* follow button */}
                    <div className="card-button">
                        <button onClick={() => onClick(obj.name)}>více možností</button>
                    </div>
                </WindowGridElement>
            ))   
        }
        </WindowGrid>
    );
}

export default AppWindowGrid;