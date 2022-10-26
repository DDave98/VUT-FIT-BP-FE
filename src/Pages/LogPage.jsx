import React, { Component } from "react";
import Dropdown from "../Components/Dropdown";

class LogPage extends React.Component
{
    render()
    {
        return (
            <div className="LogPage">
                <h1 className='text-7xl mt-10 ml-10'>Záznamy</h1>
                <div className='filterPanel w-full p-10'>
                    <Dropdown />
                </div>
            </div>
        );
    }
}

export default LogPage;