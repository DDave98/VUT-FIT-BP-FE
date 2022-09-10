import React, { Component } from "react";
import PublicPageLayout from "../../Components/PublicPageLayout/PublicPageLayout";

class ContactPage extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Kontakty</h1>
            </PublicPageLayout>
        );
    }
}

export default ContactPage;