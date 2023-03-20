

export const SendGet = async (path) =>
{
    try
    {
        var token = GetFromStorage(accessTokenTag);
        console.log("token: ", token)
        const response = await PrivateAPI.get(path, 
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log("data:  ", response.data);
        setFirstName(response.data.userName);
        setLastName(response.data.userSurname);
        setUserRole(response.data.userRole);
    }
    catch (err)
    {
        NotificationManager.error("nelze načíst data", "BaseInfo()", 10000);
        console.log("topNav error: ", err);
    }
}