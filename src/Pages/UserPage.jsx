import {NotificationManager} from 'react-notifications';
import Dropdown from '../Components/Dropdown';
import Pagination from '../Components/Pagination';
import PerPage from '../Components/PerPage';
import TableView from '../Components/TableView';
import ViewTypeSelect from '../Components/ViewTypeSelect';

const UserPage = () =>
{
    const matchCount = 2000;
    const totalPages = 20;

    const data = [
        { name: "Uživatel", surname: "Příjmení", email: "some@email.com", telefon: 777555444},
    ];
    
    return (
            <div className='UserPage'>
                <h1 className='text-7xl mt-10 ml-10'>Uživatelé</h1>
                <div className='filterPanel w-full p-10 bg-slate-100'>
                    <Dropdown />
                </div>
                <div className='DataPanel w-full p-10 bg-blue-100'>
                    <TableView
                        data = {data}
                        onPage = {10}
                        page = {1}

                    />
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