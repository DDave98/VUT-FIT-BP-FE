import { useContext } from 'react';
import AuthContext from '../Services/AuthProviderService';

export const useAuth = () => 
{
    return useContext(AuthContext);
}

export default useAuth;