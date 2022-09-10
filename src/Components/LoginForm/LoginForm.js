
import './LoginForm.css';

import React from 'react';
import {withRouter} from 'react-router-dom';

class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            
        }
    }

    render()
    {
        return (
            <>
                <h1>login form</h1>
            </>
        );
    }
}

export default withRouter(LoginForm);