import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
const orderSummary = (props)=>{
    const listOrderItems = Object.keys(props.ingredients)
        .map(igKey=>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })


    return(
        <Aux>
            <h3>Your Order</h3>
            <ul>
                {listOrderItems}

            </ul>
            <p><strong>Your Burger costs only {props.price}</strong></p>
            <Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;