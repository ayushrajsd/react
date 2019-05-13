import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true
                },
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true
                },
                touched:false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true
                },
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true
                },
                touched:false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                isValid:true
            }
        },
            price: 0,
            formIsValid: false
            
        
    }    

    checkValidity(value, rules) { 
        let isValid = false;
        if (rules && rules.required) { 
             isValid = value.trim() !== "";

        }
        if (rules && rules.minLength) { 
            isValid = isValid && value.length >= rules.minLength
        }

        if (rules && rules.maxLength) { 
            isValid = isValid && value.length <= rules.maxLength
        }
       
        return isValid;
    }

    orderHandler = (event)=>{
        event.preventDefault();
        // console.log('purchsae continue')
        let orderData = {};
        for (let orderElem in this.state.orderForm) { 
            debugger;
            orderData[orderElem] = this.state.orderForm[orderElem].value;
        }
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData: orderData,
            userId: this.props.userId
        }
        this.props.onBurgerOrder(order, this.props.token);
        
    }

    inputChangedHandler = (event, key) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElem = { ...updatedOrderForm[key] };
        updatedElem.value = event.target.value;
        updatedElem.isValid = this.checkValidity(updatedElem.value, updatedElem.validation);
        updatedElem.touched = true;
        updatedOrderForm[key] = updatedElem;

        let formValid = true;
        for (let prop in updatedOrderForm) { 
                formValid = formValid && updatedOrderForm[prop].isValid 

            
        }
        // console.log(formValid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formValid });
        // console.log(updatedElem);




    }

    render() {
        const formElArray = [];
        for (let key in this.state.orderForm) { 
            formElArray.push({id:key,config:this.state.orderForm[key]})
        }
        let form = (
        <form>
                {formElArray.map(formEl => (
                    <Input key={formEl.id}
                        type={formEl.config.elementType}
                        elementConfig={formEl.config}
                        value={formEl.config.value}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)}
                        invalid={!formEl.config.isValid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched} />
                )
                )
                
                }    
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}> Order </Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return(
            <div className= {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                
            </div>
        )
    }
}
const mapStateToProps = state => { 
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        onBurgerOrder: (orderData, token)=> dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( ContactData, axios));