import "./ButtonSecondary.css";

const ButtonSecondary = (
{
    text = "Tlačítko",
    onClick,
    extraClass = "",
    disabled = false,
}) =>
{
    return (
        <>
            <div 
                className={"btn-secondary btn" + extraClass}
                onClick={onClick}>
                {text}
            </div>
        </>
    );
}

export default ButtonSecondary;