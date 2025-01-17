import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props)=>(
    <div className={classes.CheckoutSummary}>
        <h1>Your tasty Burger is right here!</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients = {props.ingredients}/>

        </div>
        <Button btnType="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
    </div>
)

export default checkoutSummary;