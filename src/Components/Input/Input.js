
// predat funkci pro volani rodice pri zmene inputu

const Input = props =>
{
    const {
        inputType,
        inputPlaceholder,
        inputValue,
        labelText
    } = props;

    return <>
        <div className="mt-4">
            <label className="block">{labelText}</label> {/*Zadejte heslo:*/}
            <input type={inputType} placeholder={inputPlaceholder} value={inputValue} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
        </div>
    </>
};

Input.prototype =
{
//    inputType: Props.string,
//    inputPlaceholder: Props.string,
//    inputValue: Props.string,
//    labelText: Props.string,
//    handleChange: Props.
}

export default Input;