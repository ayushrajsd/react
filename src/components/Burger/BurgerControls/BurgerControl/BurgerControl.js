import React from 'react';
import classes from './BurgerControl.css';
const burgerControl = (props)=>{
    return <div className={classes.BuildControl}>
        <label className={classes.Label}>{props.label}</label>
        <button className={classes.More} onClick={props.addIngredients}>More</button>
        <button className={classes.less} onClick={props.removeIngredients} disabled={props.disabledInfo}>Less</button>
    </div>

}

export default burgerControl;