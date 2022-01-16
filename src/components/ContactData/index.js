import React, { useState, useEffect, useRef } from "react";
import Button from "../General/Button";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/action/orderActions";

const ContatcData = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [street, setStreet] = useState();

  const dunRef = useRef();

  useEffect(() => {
    if (
      props.newOrderStatus.finished &&
      !props.newOrderStatus.error // null утга boolean болохдоо --> false, дурын текст boolean болохдоо --> true болдог
    ) {
      props.history.replace("/orders");
    }
    return () => {
      // цэвэрлэгч функц: Дараагийн захиалгад бэлдэж захиалгыг хоослоно.
      props.clearOrder();
    };
  }, [props.newOrderStatus.finished]);

  const changeName = (e) => {
    if (dunRef.current.style.color === "red")
      dunRef.current.style.color = "green";
    else dunRef.current.style.color = "red";
    setName(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const changeStreet = (e) => {
    setStreet(e.target.value);
  };

  const saveOrder = () => {
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name: name,
        city: city,
        street: street,
      },
    };

    props.saveOrderAction(newOrder);
  };

  return (
    <div className={css.ContatcData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: "16px" }}>Үнэ: {props.price}₮</strong>
      </div>
      <div>
        {props.newOrderStatus.error &&
          `Захиалгыг хадгалах үед алдаа гарлаа: ${props.newOrderStatus.error}`}
      </div>
      {props.newOrderStatus.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Хот"
          />
          <Button text="ИЛГЭЭХ" btnType="Success" daragdsan={saveOrder} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    price: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
    clearOrder: () => dispatch(actions.clearOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContatcData));
