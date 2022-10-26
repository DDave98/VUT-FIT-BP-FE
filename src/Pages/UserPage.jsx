import {NotificationManager} from 'react-notifications';
import Dropdown from '../Components/Dropdown';

const UserPage = () =>
{
    return (
            <div className='UserPage'>
                <h1 className='text-7xl mt-10 ml-10'>Uživatelé</h1>
                <div className='filterPanel w-full p-10'>
                    <Dropdown />
                </div>
            </div>
    );
}

export default UserPage;