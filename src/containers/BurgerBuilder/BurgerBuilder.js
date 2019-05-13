import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';



export class BurgerBuider extends Component{

    state = {
        totalPrice: 100,
        purchasable:false,
        ordered:false,
        isLoading: false
        
    }

    componentDidMount(){
        if (this.props.isAuthenticated && this.props.buildingBurger && !this.props.purchased) {
            this.props.history.push("/checkout")
        } else { 
            this.props.onInitIngredients()
        }

    }

    
    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
            .map((ig)=>{
                return ingredients[ig]
            })
            .reduce((sum,ig)=>{
                return sum + ig
            },0)
            return sum>0
    }


    orderHandler = () => {
        this.props.onSetAuthRedirect();
        const orderState = this.state.ordered;
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth')
            
        } 
        else { 
            this.setState({
                ordered:true
            })

        }

        
    }

    cancelPurchaseHandler = ()=>{
        this.setState({
            ordered:false
        })
    }
    purchaseCancelHandler = ()=>{
        this.setState({
            ordered:false
        })
    }
    purchaseContinueHandler = ()=>{
        
        // let queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push("price="+this.state.totalPrice)
        // console.log("query param: ",queryParams)
        // const queryString=queryParams.join('&');
        // this.props.history.push({
        //     pathname:'\checkout',
        //     search:'?'+queryString
        // });4
        this.props.onPurchaseInit()
        this.props.history.push('/checkout');
    }
    render() {
        // let redirectAuth = null
        // if (this.props.isAuthenticated && this.props.buildingBurger) { 
        //         redirectAuth = <Redirect to="/checkout" />
        // }
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

      

        let burger=<Spinner/>;
        let orderSummary=null;
        if(this.props.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BurgerControls ingredients={this.props.ingredients}
                        addIngredients={this.props.onIngredientsAdded}
                        removeIngredients={this.props.onIngredientsRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        click={this.orderHandler}
                        isAuth={this.props.isAuthenticated}/>

                </Aux>
            );
            orderSummary =  (<OrderSummary ingredients={this.props.ingredients} 
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice.toFixed(2)}/>);

             
        
        }


        return (
            <Aux>
                {/* {this.state.redirectAuth} */}
                < Modal show={this.state.ordered} modalClosed={this.cancelPurchaseHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        purchased: state.order.purchased
    }

};

const mapDispatchToProps = dispatch => { 
    return {
        onIngredientsAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirect: ()=>dispatch(burgerBuilderActions.setAuthRedirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuider,axios));