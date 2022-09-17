import { useState } from "react";

const DropDowHook = () => {

    const [dropdownState, setDropdownState] = useState(false);

    const dropdownToggle = () =>
    {
        var dropdown = document.getElementById("dropdown-content");
        console.log(dropdown);
        document.getElementById("dropdown-content").classList.toggle("show");

        if(!dropdownState)
        {
            setDropdownState(true);
            dropdown.classList.add("show");
        }
        else setDropdownState(false);
    }

    return {dropdownState, dropdownToggle};
}
  
  export default DropDowHook;