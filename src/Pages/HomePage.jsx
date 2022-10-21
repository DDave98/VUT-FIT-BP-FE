import React, { Component } from "react";
import Dropdown from "../Components/Dropdown";

class HomePage extends React.Component
{
    render()
    {
        return (
                <>
                    <h1 className='text-7xl mt-10 ml-10'>Úvodní stránka</h1>
                    <Dropdown />

                </>
        );
    }
}

export default HomePage;