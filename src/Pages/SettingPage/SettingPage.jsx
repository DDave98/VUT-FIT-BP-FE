import './SettingPage.css';
import React, { Component } from "react";
import PublicPageLayout from "../../Components/PageLayout/PageLayout";

class SettingPage extends React.Component
{
    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Nastavení</h1>
            </PublicPageLayout>
        );
    }
}

export default SettingPage;