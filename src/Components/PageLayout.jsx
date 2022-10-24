import React  from "react";
import "../Styles/PageLayout.css";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

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
            
            <Footer />
        </>
    );
}

PublicPageLayout.propTypes = {}

export default PublicPageLayout;