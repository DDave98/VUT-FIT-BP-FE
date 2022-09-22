import React, { Component } from "react";
import PublicPageLayout from "../Components/PageLayout/PageLayout";

class ProfilePage extends React.Component
{
    render()
    {
        return (
            <PublicPageLayout >
                <h1 className='text-7xl mt-10 ml-10'>Profil</h1>
            </PublicPageLayout>
        );
    }
}

export default ProfilePage;