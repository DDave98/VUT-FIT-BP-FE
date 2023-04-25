import WindowGridElement from "../WindowGrid/WindowGridElement";
import "./AppWGE.css";

const UserWGE = () => 
{
    return (
        <WindowGridElement>
            {/* profile-image */}
            <div className="profile">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
            </div>

            {/* name */}
            <div className="card-name"><p>Name Surname</p></div>

            {/* username */}
            <div className="card-username"><p>Email@vutbr.cz</p></div>
            
            {/* username */}
            <div className="card-username"><p>Počet Aplikací: #</p></div>
            
            {/* work */}
            <div className="card-work"><p>Role</p></div>

            {/* follow button */}
            <div className="card-button"><button>více možností</button></div>
        </WindowGridElement>
    );
}

export default UserWGE;