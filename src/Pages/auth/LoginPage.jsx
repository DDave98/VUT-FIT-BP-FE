import React from 'react';
import API from '../../Services/AjaxService';
import Form from 'react-bootstrap/Form';
import BreakLine from '../../Components/BrakLine/BreakLine';
import Recaptcha from '../../Components/ReCAPTCHA/ReCAPTCHA';

class LoginPage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            
        }
    }

    DidMount()
    {
        API.post(
            "/api/Auth/authenticate",
            {
                login: "this.state....",
                password: "this.state...",
            }
        ).then(response =>
            {
                if (response.data) {}
                else {}
            }
        ).catch(error =>
            {
                console.log("loginPage: ", error);   
            }
        );
    }

    logInEvent(id)
    {
        console.log(id);
    }

    render()
    {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-center">Přihlášení k účtu</h3>

                        <form action="" className="mt-4">
                            <div className="flex items-baseline justify-between">
                                <Form.Label htmlFor="loginInputLogin" className='block mr-5'>Login:</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="loginInputLogin"
                                    placeholder='zadejte login'
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <Form.Label htmlFor="loginInputPasswd" className='block mr-5'>Heslo:</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="loginInputPasswd"
                                    placeholder='zadejte heslo'
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            <div className="flex items-baseline justify-between mb-6">
                                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">Přihlásit se</button>
                            </div>

                            <Recaptcha />

                            <BreakLine id={"loginBreakLine1"}>nebo</BreakLine>
                            <div id='loginSocialIcons' className="flex items-baseline justify-between">
                                <img src={require ('../../Assets/Images/socialIcons/facebook.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                                <img src={require ('../../Assets/Images/socialIcons/github.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                                <img src={require ('../../Assets/Images/socialIcons/google.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                                <img src={require ('../../Assets/Images/socialIcons/instagram.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                                <img src={require ('../../Assets/Images/socialIcons/linkedin.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                                <img src={require ('../../Assets/Images/socialIcons/microsoft.png')} className='h-10 hover:border-sky-500 hover:ring-2 hover:border-transparent'/>
                            </div>

                        </form>
                    </div>
                </div>
            </>
        );
    };
};

export default LoginPage;