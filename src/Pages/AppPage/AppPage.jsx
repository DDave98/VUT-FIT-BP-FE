import './AppPage.css';
import React, { Component } from "react";
import PublicPageLayout from "../../Components/PageLayout/PageLayout";

class AppPage extends React.Component
{
    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Aplikace</h1>
            </PublicPageLayout>
        );
    }
}

export default AppPage;