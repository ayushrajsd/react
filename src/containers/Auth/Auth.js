import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component { 

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true,
                    isEmail: true
                },
                touched:false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                isValid: false,
                validation:{
                    required: true,
                    minLength: 6
                },
                touched:false
            }
        },
        isSignUp : false
    }

    checkValidity(value, rules) { 
        let isValid = false;
        if (rules && rules.required) { 
             isValid = value.trim() != "";

        }
        if (rules && rules.minLength) { 
            isValid = isValid && value.length >= rules.minLength
        }

        if (rules && rules.maxLength) { 
            isValid = isValid && value.length <= rules.maxLength
        }

        if (rules && rules.isEmail) { 
            isValid = isValid && (value.indexOf('@') > -1 && value.indexOf('.') > -1)
        }

       
        return isValid;
    }

    inputChangedHandler = (event, controlName) => { 
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})

    }

    onSubmitHandler = (event) => { 
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp, this.props.buildingBurger)
    }

    switchAuthModeHandler = () => { 
        this.setState(prevState => { 
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }
    
    render() { 
        
        const formElArray = [];
        for (let key in this.state.controls) { 
            formElArray.push({id:key,config:this.state.controls[key]})
        }
        let form = (
            <form onSubmit={this.onSubmitHandler}>
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
                <Button btnType="Success" > SUBMIT </Button>
            </form>);
        if (this.props.loading) { 
            form = <Spinner/>
        }
        let errorMessage = null;
        if (this.props.error) { 
            errorMessage = this.props.error
        }
        return (
            <div className={classes.Auth}>
               
                <p style={{color:'red'}}>{errorMessage}</p>
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}> Switch to {this.state.isSignUp ? 'Sign In': 'Sign Up'}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        onAuth: (email, password, isSignUp, building) => dispatch(actions.auth(email, password, isSignUp, building))
    }
    
}

const mapStateToProps = state => { 
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.buildingBurgerx
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);