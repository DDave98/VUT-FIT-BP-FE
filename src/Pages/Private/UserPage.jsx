import "../../Styles/UserPage.css";
import { useState, useEffect } from 'react';
import UserPageListView from "../../Components/ViewsUserPage/UserPageListView";

const UserPage = () =>
{
    const [view, setView] = useState(<></>);
    const [header, setHeader] = useState("");
    const [detailId, setDetailId] = useState("");

    const ShowDetailView = (appID) =>
    {
        setDetailId(appID);
        setHeader("Uživatelé / Detail");
        console.log("detail of: ", appID);
    }

    const ShowListView = () =>
    {
        setDetailId("");
        setView(listView);
        setHeader("Úživatelé");
    }

    const detailView = <></>;
    const listView = <UserPageListView returnBack={ShowListView} appID={detailId} />;

    useEffect(() => 
    {
        ShowListView();
    }, []);

    useEffect(() => 
    {
        if (detailId != "")
        {
            setView(detailView);
        }
    }, [detailId]);

    return (
        <div className='UserPage Page'>
            <h1>{header}</h1>
            {view}
        </div>
    );
}

export default UserPage;