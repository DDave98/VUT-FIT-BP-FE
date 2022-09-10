import "./TarrifPage.css";
import React, { Component } from "react";
import PublicPageLayout from "../../Components/PublicPageLayout/PublicPageLayout";

class TarrifPage extends React.Component
{
    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Ceník</h1>
            </PublicPageLayout>
        );
    }
}

export default TarrifPage;