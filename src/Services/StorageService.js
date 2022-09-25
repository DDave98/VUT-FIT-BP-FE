import PropTypes from 'prop-types';

// get token from local storage
export function GetFromStorage(tag)
{
    const token = localStorage.getItem(tag);
    return token ?? false;
}

GetFromStorage.propTypes = {
    tag: PropTypes.string,
}

// save token to local storage
export function SaveToStorage(token, tag)
{
    return new Promise((resolve) =>
        {
            localStorage.setItem(tag, token);
            resolve();
        }
    );
}

SaveToStorage.propTypes = {
    tag: PropTypes.string,
    token: PropTypes.string,
}

// delete token in local strorage
export function DeleteFromToken(tag)
{
    return new Promise((resolve) =>
        {
            localStorage.removeItem(tag);
            resolve();
        }
    );
}

DeleteFromToken.propTypes = {
    tag: PropTypes.string,
}