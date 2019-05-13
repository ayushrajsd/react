import * as actionTypes from '../actions/actionTypes.js';

const INGREDIENTS_PRICE = {
    cheese: 30,
    salad: 30,
    paneer: 50,
    aloo: 40
};

const initialState = {
    ingredients: null,
    totalPrice: 100,
    error: false,
    building:false
};
const reducer = (state = initialState, action) => { 
    switch (action.type) { 
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building: true
                
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1

                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                building: true
                
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    aloo: action.ingredients.aloo,
                    paneer: action.ingredients.paneer
                },
                error: false,
                totalPrice: 100,
                building: false
            }    
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                building: true
            }    
        default:
            return state;    
            
    }


}

export default reducer;