const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 1000,
  purchasing: false,
  ingredientNames: {
    salad: "Салад",
    bacon: "Гахайн мах",
    cheese: "Бяслаг",
    meat: "Үхрийн мах",
  },
};

const INGREDIENT_PRICE = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ortsNer],
        purchasing: true,
      };
    case "REMOVE_INGREDIENT":
      const newPrice = state.totalPrice - INGREDIENT_PRICE[action.ortsNer];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
        },
        totalPrice: newPrice,
        purchasing: newPrice > 1000,
      };
    case "CLEAR_ORDER":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
