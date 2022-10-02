import React, { Component } from "react";
import PublicPageLayout from "../Components/PageLayout";

class HomePage extends React.Component
{
    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Úvodní stránka</h1>
            </PublicPageLayout>
        );
    }
}

export default HomePage;