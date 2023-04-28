import { useEffect, useState } from "react";
import AppPageDetailView from "../Components/ApplicationPage/AppPage-DetailView";
import AppPageListView from "../Components/ApplicationPage/AppPage-ListView";
import AppPageNewView from "../Components/ApplicationPage/AppPage-NewView";

const AppPage = () =>
{
    const [view, setView] = useState(<></>);
    const [header, setHeader] = useState("");
    const [detailId, setDetailId] = useState("");

    const ShowDetailView = (appID) =>
    {
        setDetailId(appID);
        console.log("detail of: ", appID);
    }

    const ShowListView = () =>
    {
        setView(listView);
        setHeader("Aplikace");
    }

    const ShowNewView = () =>
    {
        setView(addNewView);
        setHeader("Aplikace / Nová");
    }

    const listView = <AppPageListView showDetail={ShowDetailView} showNew={ShowNewView} />
    const detailView = <AppPageDetailView returnBack={ShowListView} appID={detailId} />;
    const addNewView = <AppPageNewView returnBack={ShowListView} />;

    // 
    useEffect(() => 
    {
        ShowListView();
    }, []);

    useEffect(() => 
    {
        setView(detailView);
        setHeader("Aplikace / Detail");
    }, [detailId]);

    return (
        <div className='AppPage Page'>

            <h1>{header}</h1>
            <div className="AppPageContent">
                {view}
            </div>
        </div>
    );
}

export default AppPage;