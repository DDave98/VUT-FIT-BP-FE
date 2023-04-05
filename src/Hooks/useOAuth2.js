// useOAuth2.js
import {
  useState,
  useRef
} from 'react';
import { authCodeTag } from "../Constants/storageTag";
import { consoleLog } from '../Services/DebugService';
import { GetFromStorage, DeleteFromStorage } from "../Services/StorageService";

const OAUTH_STATE_KEY = 'react-use-oauth2-state-key';
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;

/************************************************************/
// STATE GENERATOR
// This parameter is needed to mitigate CSRF attacks

// https://medium.com/@dazcyril/generating-cryptographic-random-state-in-javascript-in-the-browser-c538b3daae50
const generateState = () => 
{
  consoleLog("generating state");
	const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let array = new Uint8Array(40);
	window.crypto.getRandomValues(array);
	array = array.map((x) => validChars.codePointAt(x % validChars.length));
	const randomState = String.fromCharCode.apply(null, array);
  consoleLog("generated state: " + randomState);

	return randomState;
};

const saveState = (state) => 
{
	sessionStorage.setItem(OAUTH_STATE_KEY, state);
};

const removeState = () => {
	sessionStorage.removeItem(OAUTH_STATE_KEY);
};

/************************************************************/
// POPUP WINDOW

const openPopup = (url) => 
{
	// To fix issues with window.screen in multi-monitor setups, the easier option is to
	// center the pop-up over the parent window.
	const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
	const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  const target = '_blank';
  const size = `height=${POPUP_HEIGHT}, width=${POPUP_WIDTH}, top=${top}, left=${left}`;
	return window.open(url, target, size);
};

const closePopup = (popupRef) => 
{
	popupRef.current?.close();
  popupRef.current = null;
};

const cleanup = ( popupRef, handleMessageListener ) => 
{
	closePopup(popupRef);
	//removeState();
  window.removeEventListener('message', handleMessageListener);
  DeleteFromStorage(authCodeTag);
};

/************************************************************/
// URL

const formatAuthorizeUrl = (authorizeUrl, clientId, redirectUri, scope, state) => 
{
	const url = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  consoleLog("generated url: " + url);
	return url;
};


/************************************************************/
// OAuth HOOK
// https://tasoskakour.com/blog/react-use-oauth2

const useOAuth2 = ({ 
  authEndpoint,
  clientId, 
  redirectUri, 
  scope,
  onError, onSuccess
}) => {
  const [{ loading, error }, setUI] = useState({ loading: false, error: null });
  const popupRef = useRef(null);
  const listenerRef = useRef(null);

  const authorize = async () => 
  {
    try 
    {
      // 1. Init
      setUI({loading: true, error: null,});

      // 2. Generate and save state
      // const generateState = generateState();

      // 3. Open popup
      const url = formatAuthorizeUrl(authEndpoint, clientId, redirectUri, scope, "123XYZ");
      popupRef.current = openPopup(url);

      // 4. get code from window
      await getAuthorizationCode();
      const authCode = GetFromStorage(authCodeTag);
      consoleLog("useOAuth.js | autorize | code: "+ authCode);
      setUI({loading: false, error: null});
      await onSuccess(authCode)
    } 
    catch (err) 
    {
      consoleLog("useOAuth.js | autorize | popuperror: " + err);
      setUI({loading: false, error: err});
      onError(error)
    }
    finally
    {
      cleanup(popupRef, listenerRef.current);
    } 
  };

  // funkce obluhující okno
  const getAuthorizationCode = () => 
  {
    return new Promise((resolve, reject) => 
    {
      if (!popupRef.current) reject(new Error('Okno je blokované nebo zavřené'));
      
      listenerRef.current = (event) => 
      {
        const code = GetFromStorage(authCodeTag);
        if (code != false)
        {
          consoleLog("useOAuth.js | getAuthorizationCode | load from strorage: " + code);
          if (code != "") resolve(code);
          else reject(new Error("chybí kód"));
        }
      };
      
      // Register message listener
      window.addEventListener('message', listenerRef.current);

      // Remove listener(s) on unmount
      return () => {
        window.removeEventListener('message', listenerRef.current);
      };
    });
  };

  return [authorize, loading];
};

export default useOAuth2;