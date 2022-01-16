import React, { useEffect, useState } from "react";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import * as actions from "../../redux/action/signupActions";
import { connect } from "react-redux";
import Spinner from "../../components/General/Spinner";
import { Redirect } from "react-router-dom";

const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (email && !isEmailValid(email)) {
      setError("ИМэйл хаяг алдаатай байна!");
    } else if (password1 && password1.length < 6) {
      setError("Нууц үг урт багадаа 6 тэмдэгтээс бүрдэх ёстой!");
    } else if (password2 && !(password1 === password2)) {
      setError("Нууц үгүүд хоорондоо тохирохгүй байна!");
    } else setError("");
  }, [email, password1, password2]);

  const isEmailValid = (tryEmail) => {
    return tryEmail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const signup = () => {
    if (password1 === password2) {
      setError("");
      props.singupUser(email, password1);
    } else {
      setError("Нууц үгүүд хоорондоо тохирохгүй байна!");
    }
  };

  return (
    <div className={css.SignupPage}>
      {props.userId && <Redirect to="/" />}
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="ИМэйл хаяг"
      />
      <input
        onChange={(e) => setPassword1(e.target.value)}
        type="password"
        placeholder="Нууц үгээ оруулна уу!"
      />
      <input
        onChange={(e) => setPassword2(e.target.value)}
        type="password"
        placeholder="Нууц үгээ давтан оруулна уу!"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {props.firebaseError && (
        <div style={{ color: "red" }}>{props.firebaseError}</div>
      )}
      {props.saving && <Spinner />}
      <Button text="БҮРТГҮҮЛЭХ" btnType="Success" daragdsan={signup} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    saving: state.signupLoginReducer.saving,
    firebaseError: state.signupLoginReducer.firebaseError,
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    singupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
