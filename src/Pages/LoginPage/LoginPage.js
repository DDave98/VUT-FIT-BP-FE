
import './LoginPage.css';
import React from 'react';

class LoginPage extends React.Component
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
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                        <h3 className="text-2xl font-bold text-center">Přihlášení k účtu</h3>
                        <form action="" className="mt-4">
                            <div>
                                <label className="block">Zadejte login:</label>
                                <input type="text" placeholder="váš login" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="mt-4">
                                <label className="block">Zadejte heslo:</label>
                                <input type="password" placeholder="vaše heslo" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">Přihlásit se</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    };
};

export default LoginPage;