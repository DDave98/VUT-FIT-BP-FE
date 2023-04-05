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
export function SaveToStorage(val, tag)
{
    return new Promise((resolve) =>
        {
            localStorage.setItem(tag, val);
            resolve();
        }
    );
}

SaveToStorage.propTypes = {
    tag: PropTypes.string,
    val: PropTypes.string,
}

// delete token in local strorage
export function DeleteFromStorage(tag)
{
    return new Promise((resolve) =>
        {
            localStorage.removeItem(tag);
            resolve();
        }
    );
}

DeleteFromStorage.propTypes = {
    tag: PropTypes.string,
}