//Keypad — in this component we will put all the buttons
import "./Keypad.css";
import Button from "../Button/Button";

const buttons = [
    { value: '7', className: "",typeVal:"number" },
    { value: '8', className: "",typeVal:"number" },
    { value: '9', className: "",typeVal:"number" },
    { value: "DEL", className: "delBtn", typeVal:"delBtn" },
    { value: '4', className: "", typeVal:"number"  },
    { value: '5', className: "", typeVal:"number"  },
    { value: '6', className: "", typeVal:"number"  },
    { value: '+', className: "", typeVal:"operator"  },
    { value: '1', className: "", typeVal:"number" },
    { value: '2', className: "", typeVal:"number"},
    { value: '3', className: "", typeVal:"number"},
    { value: '-', className: "", typeVal:"operator" },
    { value: '.', className: "", typeVal:"number" },
    { value: '0', className: "", typeVal:"number"},
    { value: '/', className: "", typeVal:"operator" },
    { value: '*', className: "", typeVal:"operator"},
    { value: "RESET", className: "resetBtn span", typeVal:"resetBtn" },
    { value: '=', className: "equalBtn span", typeVal:"equalBtn"  },
];


function Keypad(props) {
    return (
        <div className="keypad">
            {buttons.map((button) => {
                return (
                   <Button className={`btn ${button.className}`} key={props.value} onClick={() => {props.onClick(button);}} value={button.value} />
                )})}
        </div>
    );
}

export default Keypad;
