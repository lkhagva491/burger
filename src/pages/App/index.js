import React, { Suspense, useEffect, useState } from "react";
import css from "./style.module.css";
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/SideBar";
import { Switch, Route, Redirect } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import { connect } from "react-redux";
import Logout from "../../components/Logout";
import * as actions from "../../redux/action/loginActions";
import * as signupActions from "../../redux/action/signupActions";

const BurgerPage = React.lazy(() => {
  return import("../BurgerPage");
});

const SignupPage = React.lazy(() => {
  return import("../SignupPage");
});

const OrderPage = React.lazy(() => {
  return import("../OrderPage");
});

const App = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevShowSidebar) => !prevShowSidebar);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    // const refreshToken = localStorage.getItem("refreshToken");
    if (token && userId) {
      if (expireDate > new Date()) {
        props.autoLogin(token, userId);
        props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        props.logout();
      }
    }
  }, []);

  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />

      <SideBar showSideBar={showSideBar} toggleSideBar={toggleSideBar} />

      <main className={css.Content}>
        <Suspense fallback={<div>Түр хүлээнэ үү!</div>}>
          {props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/ship" component={ShippingPage} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="/login" />
            </Switch>
          )}
        </Suspense>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.signupLoginReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillisec: (ms) =>
      dispatch(signupActions.autoLogoutAfterMillisec(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
