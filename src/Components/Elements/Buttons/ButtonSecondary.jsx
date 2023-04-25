import "./ButtonSecondary.css";

const ButtonSecondary = (
{
    text = "Tlačítko",
    onClick,
    extraClass = "",
}) =>
{
    return (
        <>
            <div 
                className={"btn-secondary btn" + extraClass}
                onClick={onClick}>{text}
            </div>
        </>
    );
}

export default ButtonSecondary;