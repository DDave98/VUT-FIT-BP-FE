import "./SocialProfileCheckBox.css";

const SocialProfileCheckBox =
({
    isChecked = true,
    disabled = false,
    onChange,
    val,
    children
}) =>
{
    return (
        <div className="SocialProfileCheckBox">
            <h6>
                {children}
            </h6>
            <input 
                type="CheckBox" 
                checked={isChecked}
                disabled={disabled}
                onChange={onChange}
                value={val}
            />
        </div>
    );
}

export default SocialProfileCheckBox;