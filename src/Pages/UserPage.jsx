import {NotificationManager} from 'react-notifications';
import Dropdown from '../Components/Dropdown';
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import ViewTypeSelect from '../Components/ViewTypeSelect';

const UserPage = () =>
{
    const matchCount = 2000;
    const totalPages = 20;
    
    return (
            <div className='UserPage'>
                <h1 className='text-7xl mt-10 ml-10'>Uživatelé</h1>
                <div className='filterPanel w-full p-10 bg-slate-100'>
                    <Dropdown />
                </div>
                <div className='DataPanel w-full p-10 bg-blue-100'>

                </div>
                <div className='DataViewPanel w-full p-10 bg-orange-100'>
                    <PerPage />
                    <Pagination totalPages={totalPages} />
                    {'Počet výsledků: '}{matchCount}
                    <ViewTypeSelect />
                </div>
            </div>
    );
}

export default UserPage;