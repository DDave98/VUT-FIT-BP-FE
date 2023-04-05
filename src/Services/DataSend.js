

export const SendGet = async (path) =>
{
    try
    {
        var token = GetFromStorage(accessTokenTag);
        const response = await PrivateAPI.get(path, 
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        
        setFirstName(response.data.userName);
        setLastName(response.data.userSurname);
        setUserRole(response.data.userRole);
    }
    catch (err)
    {
        NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
        consoleLog("topNav error: ", err);
    }
}