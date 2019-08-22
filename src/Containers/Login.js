import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import axios from "axios";
import Logo from "../images/Logo.png";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            redirectToReferrer: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
        try {
            const response = await axios.post(
                "https://respos-api-pvjdheicmq-uc.a.run.app/api/login",
                {
                    email: this.state.email
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Row
                type={"flex"}
                align={"middle"}
                justify={"center"}
                style={{ minHeight: "100vh" }}
            >
                <Col
                    xs={22}
                    style={{
                        minHeight: "70vh",
                        width: "100%",
                        maxWidth: "300px",
                        textAlign: "center"
                    }}
                >
                    <img src={Logo} alt="" style={{ width: "80%" }} />
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: "30px" }}>
                        <Form.Item>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!"
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail!"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon type={"user"} style={{ color: "rgba(0,0,0,.25)" }} />
                                    }
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Enter email"}
                                    onChange={this.handleChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type={"primary"} size={"large"} htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Form.create()(Login);
