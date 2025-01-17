import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    orders: [],
    purchased: false
}

const reducer = (state=initialState, action) => { 
    switch (action.type) { 
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }    
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }    
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
                
            }    
            // console.log(newOrder)
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }  
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }   
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                loading:false
            }    
        
        default:
        return state    
    }
}

export default reducer;

