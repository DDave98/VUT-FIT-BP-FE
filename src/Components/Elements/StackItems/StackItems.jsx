import "./StackItems.css"

const StackOfItems = ({children}) =>
{
    return (
        <ul className="StackOfItems">
            {children}
        </ul>
    );
}

const StackItem = ({children}) =>
{
    return (
        <li className="StackItem">
            {children}
        </li>
    );
}

export {StackItem, StackOfItems};