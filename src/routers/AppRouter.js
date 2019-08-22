import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "../Containers/App";
import Login from "../Containers/Login";
import clientList from "../Components/clientsList";
import clientForm from "../Components/clientForm";
import clients from "../Pages/clients";


export default class AppRouter extends React.Component {
    render() {
        const { match } = this.props;
        const history = createBrowserHistory();
        return (
            <Router history={history}>
                <Switch>
                    <Route path={"/login"} component={Login} exact={true} />
                    <App>
                    <Route path={"/clients"} component={clients}/>
                    </App>
                </Switch>
            </Router>
        );
    }
}
