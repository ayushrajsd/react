import React from 'react';
import classes from './Order.css';

const order = (props)=>{
    const ingredients = [];
    for (let ig in props.ingredients){
        ingredients.push({name:ig,amount:props.ingredients[ig]})
    }
    const ingredientOutput = ingredients.map(ig=>{
        return <span 
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            border: '1px solid #ccc',
            padding:'5px',
            margin:'0 5px',
            boxShadow:'0 2px 2px #eee'
        }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return(
        <div className={classes.Order}>
        <p>INGREDIENTS: {ingredientOutput}</p>
        <p>Price: <strong>INR {props.price}</strong></p>
    </div>
    )
    
}

export default order;