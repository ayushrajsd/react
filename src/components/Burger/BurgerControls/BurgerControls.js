import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import classes from './BurgerControls.css';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Paneer',type:'paneer'},
    {label:'Aloo',type:'aloo'},
]


const burgerControls = (props)=>(
   <div className={classes.BurgerControls}>
     <p>Current Price<strong>{props.price.toFixed(2)}</strong></p>

       {controls.map(ingredient=>(
           <BurgerControl key={ingredient.label} label={ingredient.label} 
           addIngredients = {()=>props.addIngredients(ingredient.type)}
           removeIngredients = {()=>props.removeIngredients(ingredient.type)}
           disabledInfo = {props.disabledInfo[ingredient.type]}
           price = {props.price}
           />
       ))}  
       <button className={classes.OrderButton}
            disabled={!props.purchasable} onClick={props.click}
        >{props.isAuth ? 'Order Now' : 'Sign Up to Continue'}</button>
   </div>
);

export default burgerControls;