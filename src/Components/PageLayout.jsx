import React  from "react";
import "../Styles/PageLayout.css";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const PublicPageLayout = (props) =>
{
    return (
        <>
            <TopNavbar />
            
            {/* obsah */}
            <div id="pageContent">
                {props.children}
                <Outlet />
            </div>

            <div className="ml-auto mr-auto text-center mt-10 mb-20">
                <h2 className="text-xl">Na webu se pracuje</h2>
                <img src="https://www.nicepng.com/png/detail/137-1379308_website-work-in-progress.png" className="inProgress ml-auto mr-auto"/>
            </div>
            <NotificationContainer />
            <Footer />
        </>
    );
}

PublicPageLayout.propTypes = {}

export default PublicPageLayout;