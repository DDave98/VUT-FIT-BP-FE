
export const useTimeout = (delay) =>
{
    return new Promise( res => setTimeout(res, delay) );
}