import React, { useState } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import { connect } from "react-redux";
import * as actions from "../../redux/action/loginActions";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

const LoginPage = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeEmail = (e) => {
    const changedEmail = e.target.value;
    setForm((formBefore) => ({
      email: changedEmail,
      password: formBefore.password,
    }));
  };

  const changePassword = (e) => {
    const changedPassword = e.target.value;
    setForm((formBefore) => ({
      email: formBefore.email,
      password: changedPassword,
    }));
  };

  const login = () => {
    props.login(form.email, form.password);
  };

  // const validateEmail = (e) => {
  //   if (
  //     e.target.value &&
  //     !e.target.value.match(
  //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     )
  //   ) {
  //     alert("ИМэйл хаяг алдаатай байна!");
  //   }
  // };

  return (
    <div className={css.LoginPage}>
      {props.userId && <Redirect to="/orders" />}
      <input
        onChange={changeEmail}
        // onBlur={validateEmail}
        type="text"
        placeholder="ИМэйл хаяг"
      />
      <input onChange={changePassword} type="password" placeholder="Нууц үг" />
      {props.firebaseError && (
        <div style={{ color: "red" }}>{props.firebaseError}</div>
      )}
      {props.logginIn && <Spinner />}
      <Button text="Нэвтрэх" btnType="Success" daragdsan={login} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.loginUser(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    logginIn: state.signupLoginReducer.logginIn,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
