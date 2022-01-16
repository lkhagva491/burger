import axios from "../../axios.order";
export const loadOrders = (userId) => {
  return function (dispatch, getState) {
    // Захиалгыг татаж эхэллээ
    dispatch(loadOrderStart());
    const token = getState().signupLoginReducer.token;
    axios
      .get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then((response) => {
        dispatch(loadOrderSuccess(Object.entries(response.data).reverse()));
      })
      .catch((err) => dispatch(loadOrderError(err)));
  };
};

export const clearOrder = () => {
  return {
    type: "CLEAR_ORDER",
  };
};

export const loadOrderStart = () => {
  return {
    type: "LOAD_ORDER_START",
  };
};

export const loadOrderSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDER_SUCCESS",
    orders: loadedOrders,
  };
};

export const loadOrderError = (error) => {
  return {
    type: "LOAD_ORDER_ERROR",
    error,
  };
};

export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    // Захиалгыг хадгалж эхэллээ
    dispatch(saveOrderStart());
    const token = getState().signupLoginReducer.token;
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((response) => {
        dispatch(saveOrderSuccess());
      })
      .catch((error) => {
        dispatch(saveOrderError(error));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};

export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};
