//Button — represents each button on the keypad
import "./Button.css"

function Button(props){
        return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
        );
}

export default Button;