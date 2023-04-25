import React, { Component } from "react";
import Dropdown from "../Components/Dropdown";
import HomePageMain from "../Components/HomePage/HomePageMain";

class HomePage extends React.Component
{
    render()
    {
        return (
                <div className="HomePage">
                    <h1 className='text-7xl mt-10 ml-10'>Úvodní stránka</h1>
                    <div className='filterPanel w-full p-10'>
                        <Dropdown />
                    </div>
                    <HomePageMain />
                </div>
        );
    }
}

export default HomePage;