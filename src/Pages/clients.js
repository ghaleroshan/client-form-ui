import React from "react";
import axios from "axios";
import { Table, Divider, Icon } from "antd";
import { Route, Switch } from "react-router-dom";
import clientForm from "../Components/clientForm";
import clientsList from "../Components/clientsList";

export default class clientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        };
    }

    render() {
        const { match } = this.props;

        return (
            <div>
                <Switch>
                    <Route
                        path={`${match.path}/client-form`}
                        component={clientForm}
                    />
                    <Route path={`${match.path}`} component={clientsList} />
                </Switch>
            </div>
        );
    }
}
