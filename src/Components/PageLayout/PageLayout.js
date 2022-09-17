
import React  from "react";
import "./PageLayout.css";
import TopNavbar from "../TopNavbar/TopNavbar";
import Footer from "../Footer/Footer";

const PublicPageLayout = (props) =>
{
    return (
        <>
            <TopNavbar />
            
            {/* obsah */}
            <div id="pageContent">
                {props.children}
            </div>

            <div className="ml-auto mr-auto text-center mt-10 mb-20">
                <h2 className="text-xl">Na webu se pracuje</h2>
                <img src="https://www.nicepng.com/png/detail/137-1379308_website-work-in-progress.png" className="inProgress ml-auto mr-auto"/>
            </div>
            
            <Footer />
        </>
    );
}

export default PublicPageLayout;