import React, { Component } from "react";
import Dropdown from "../Components/Dropdown";

class AppPage extends React.Component
{
    render()
    {
        return (
            <div className="AppPage">
                <h1 className='text-7xl mt-10 ml-10'>Aplikace</h1>
                <div className='filterPanel w-full p-10'>
                    <Dropdown />
                </div>
            </div>
        );
    }
}

export default AppPage;