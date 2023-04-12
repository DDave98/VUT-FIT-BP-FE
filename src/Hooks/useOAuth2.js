// useOAuth2.js
import {
  useState,
  useRef,
  useEffect
} from 'react';
import { authCodeTag } from "../Constants/storageTag";
import { consoleLog } from '../Services/DebugService';
import { GetFromStorage, DeleteFromStorage } from "../Services/StorageService";
import { useTimeout } from './useTimeout';

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

const ClearStorage = () => DeleteFromStorage(authCodeTag);

const cleanup = ( popupRef, handleMessageListener ) => 
{
	closePopup(popupRef);
	//removeState();
  ClearStorage();
};

/************************************************************/
// URL
const redirectURI = "http://localhost:3000/OAuth/Callback";
const formatAuthorizeUrl = (authorizeUrl, clientId, scope, state) => 
{
  const rtype = "?response_type=code";
  const cid= "&client_id=" + clientId;
  const redirect_uri = "&redirect_uri=" + redirectURI;
  const scopes = "&scope=" + scope;
  const states = "&state=" + state;
	const url = authorizeUrl + rtype + cid + redirect_uri + scopes + states;
  consoleLog("generated url: " + url);
	return url;
};

function waitForAuthCode(popupRef, authCodeTag, timeout = 300000) 
{
  consoleLog("waiting for auth code");
  return new Promise((resolve, reject) => 
  {
    const startTime = Date.now();
    const checkForAuthCode = () => 
    {
      if (!popupRef.current) 
      {
        consoleLog("OAuth windows was force closed");
        reject(new Error('Popup window closed before authentication completed'));
        return;
      }

      const value = GetFromStorage(authCodeTag);

      if (value)
      {
        resolve(value);
        return;
      }

      if (Date.now() - startTime > timeout) 
      {
        consoleLog("OAuth windows timed out");
        reject(new Error('Authentication timed out'));
        return;
      }

      setTimeout(checkForAuthCode, 15000);
    };

    checkForAuthCode();
  });
}

/************************************************************/
// OAuth HOOK
// https://tasoskakour.com/blog/react-use-oauth2

const useOAuth2 = ({authEndpoint,clientId, scope, onError, onSuccess}) => 
{
  const [{ loading, error }, setUI] = useState({ loading: false, error: null });
  const popupRef = useRef(null);
  const CleanWindow = () => {cleanup(popupRef)};

  const authorize = async () => 
  {
    var authCode = "";
    try 
    {
      // 1. Init
      setUI({loading: true, error: null,});
      cleanup(popupRef);

      // 2. Generate and save state
      // const generateState = generateState();

      // 3. Open popup
      const url = formatAuthorizeUrl(authEndpoint, clientId, scope, "123XYZ");
      popupRef.current = openPopup(url);

      // 4. get code from window
      authCode = await waitForAuthCode(popupRef, authCodeTag);
      consoleLog("useOAuth.js | autorize | code: "+ authCode);
      setUI({loading: false, error: null});
    } 
    catch (err) 
    {
      consoleLog("useOAuth.js | autorize | popuperror: " + err);
      setUI({loading: false, error: err});
    }
    finally
    {
      // zavření okna -> cleanup(popupRef); zavoláse po ověření se serverem
      return authCode;
    } 
  };

  return [authorize, loading, CleanWindow];
};

export default useOAuth2;