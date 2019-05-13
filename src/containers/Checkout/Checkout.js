import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Checkout extends Component{

   
//    state={
//        ingredients:null,
//        totalPrice:0
//    }

//    componentDidMount(){
//        console.log("reched in checkout")
//    let query = queryString.parse(this.props.location.search);
//    const ingredients = {};
//     let price = 0;
//     for (let key of Object.keys(query)){
//         if(key == "price"){
//             price = query[key]
//         } else{
//             ingredients[key] = + (query[key]);
//         }
        
//     }
   
//     this.setState({
//         ingredients:ingredients,
//         totalPrice:price
//     })
// }

   checkoutCancelHandler=() => {
       this.props.history.goBack();


   }

   checkoutContinueHandler = ()=>{
       this.props.history.replace('/checkout/contact-data');
   }


    render(){
        let checkoutSummary = null;
        let purchaseRedirect = null
        if (this.props.ingredients) {
            purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            checkoutSummary = (<CheckoutSummary ingredients={this.props.ingredients}
                checkoutCancel={this.checkoutCancelHandler}
                checkoutContinue={this.checkoutContinueHandler}/>)
        }
        return(
            <div>
                {purchaseRedirect}
                {checkoutSummary}
                {/* <Route path={this.props.match.path+'/contact-data'} 
                render={(props)=>(<ContactData ingredients={this.state.ingredients}
                 price={this.state.totalPrice} {...props}/>)}/> */}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )

    }
}

const mapStateToProps = state => { 
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);