useEffect(() =>
{
    const result = passwordRegex.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === pwd2;
    setPwd2(match);
}, [pwd, pwd2])