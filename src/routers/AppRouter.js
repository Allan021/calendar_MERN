import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
/* import Swal from "sweetalert2"; */
import { revalidarTocken } from "../actions/auth";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { LoginScreen } from "../pages/Login/LoginScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { cheking, uid } = useSelector((state) => state.auth);

  //utilizare el useefetc para que cada vez que se cambie el tocken entonces revlaidaere el tocken
  useEffect(() => {
    dispatch(revalidarTocken());
  }, [dispatch]);

  if (cheking) {
    <div></div>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            path="/"
            isAuthenticated={!!uid}
            exact
            component={CalendarScreen}
          />
          <PublicRoute
            isAuthenticated={!!uid}
            path="/login"
            exact
            component={LoginScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
