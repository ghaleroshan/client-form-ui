import React from "react";
import axios from "axios";
import { timeout } from "../config.js";
import { Table, Divider, Icon, Row, Button } from "antd";
import { Link } from "react-router-dom";
import spinner from "../images/Spinner.gif"

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Full Name",
        dataIndex: "fullName",
        key: "fullName",
        render: (text, record) => (
            <span>{record.fullName}</span>
        )},
    {
        title: "Age",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Actions",
        key: "actions",
        align: "right",
        render: (text, record) => (
            <span>
        <a href="javascript:;">Edit</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
        )
    }
];

export default class ClientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            error: null
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.get(
                "https://client-form-api-tmwszumhna-uc.a.run.app/api/clients",
                {
                    timeout
                }
            );
            this.setState({ clients: res.data });
        } catch (error) {
            this.setState({ error: "Request Timed out" });
        }
    }

    render() {
        const { match } = this.props;

        if (this.state.clients.length > 0) {
            return (
                <div>
                    <Row type={"flex"} justify={"end"}>
                        <Link to={`${match.url}/client-form`}>
                            <Button size={"large"}>
                                <Icon type="plus" />
                                <span className="nav-text">Add Clients</span>
                            </Button>
                        </Link>
                    </Row>
                    <Divider />
                    <Table columns={columns} dataSource={this.state.clients} />
                </div>
            );
        } else {
            return <img src={spinner} alt="" style={{ width: "30%" }} />;
        }
    }
}
