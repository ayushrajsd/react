import React from 'react';
import classes from './Input.css';

const input = (props) =>{
    let inputElement = null;
    let inputElementCss = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) { 
        inputElementCss.push(classes.Invalid);
    }
    switch(props.type){
        case ('input'):
            inputElement = <input className={inputElementCss.join(" ")} onChange={props.changed}
                {...props.elementConfig.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputElementCss.join(" ")} onChange={props.changed}
                {...props.elementConfig.elementConfig} value={props.value} />;
            break;
        case 'select':
            inputElement = (<select className={inputElementCss.join(" ")} onChange={props.changed}>
                {props.elementConfig.elementConfig.options.map(op => (
                    <option key={op.value} value={op.value} >{op.displayValue}</option>
                ))}
            </select>
            )
            break;
            
        default:
            inputElement = <input className={inputElementCss.join(" ")} onChange={props.changed}
                {...props.elementConfig.elementConfig} value={props.value} />;

    }

    return(
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
