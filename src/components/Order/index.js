import React from "react";
import css from "./style.module.css";

const Order = (props) => {
  return (
    <div className={css.Order}>
      <p>
        Орц: Салад: {props.order.orts.salad}, Гахайн мах:{" "}
        {props.order.orts.bacon}, Бяслаг: {props.order.orts.cheese}, Үхрийн мах:{" "}
        {props.order.orts.meat}
      </p>
      <p>
        Хаяг: {props.order.hayag.name} | {props.order.hayag.street} |{" "}
        {props.order.hayag.city}
      </p>
      <p>
        Үнийн дүн: <strong>{props.order.dun}₮</strong>
      </p>
    </div>
  );
};

export default Order;
