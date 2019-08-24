import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import {
    Form,
    Icon,
    PageHeader,
    Input,
    Select,
    InputNumber,
    Switch,
    Button,
    Divider,
    Row,
    Col
} from "antd";
import axios from "axios";

export default class clientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            age: "",
            gender: "",
            address: "",
            phone: "",
            email:"",
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({gender: event.target.value})
    }
    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form.getFieldsValue());
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.fullName = values.fullName;
                this.state.age = values.age;
                this.state.gender = values.gender;
                this.state.phone = values.phone;
                this.state.email = values.email;
                this.state.address = values.address;
            }
        });
        try {
            const response = await axios.post(
                "https://client-form-api-tmwszumhna-uc.a.run.app/api/clients",
                {
                    fullName: this.state.fullName,
                    age: this.state.age,
                    gender: this.state.gender,
                    phone: this.state.phone,
                    email: this.state.email,
                    address: this.state.address
                }
            );

            this.props.history.push("/clients");
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const { Option } = Select;
        const history = createBrowserHistory();
        const { match } = this.props;

        const formItemLayout = {
            layout: "horizontal",
            labelCol: {
                xs: 24,
                sm: 8,
                md: 6
            },
            wrapperCol: {
                xs: 24,
                sm: 16,
                md: 18
            }
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                },
                md: {
                    span: 18,
                    offset: 6
                }
            }
        };

        return (
            <Row>
                <Col xs={24}>
                    <PageHeader onBack={history.goBack} title="Add a Client" />,
                </Col>
                <Col xs={24} style={{ maxWidth: "600px" }}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label={"Full Name"}>
                            {getFieldDecorator("fullName", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input the full name."
                                    }
                                ]
                            })(<Input placeholder={"Please provide your full name"} name={"fullName"} />)}
                        </Form.Item>

                        <Form.Item label={"Age"}>
                            {getFieldDecorator("age", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please provide the age."
                                    }
                                ]
                            })(<Input placeholder={"Please provide your Age"} name = {"age"} />)
                            }
                        </Form.Item>
                        <Form.Item label={"Gender"}>
                            {getFieldDecorator("gender", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select gender."
                                    }
                                ]
                            })(
                                <Select
                                    placeholder="Select your gender"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Others">Others</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label={"Address"}>
                            {getFieldDecorator("address", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please provide full address details."
                                    }
                                ]
                            })(
                                <Input placeholder={"Please provide your full address"} name = {"address"}/>
                            )}
                        </Form.Item>
                        <Form.Item label={"Phone No"}>
                            {getFieldDecorator("phone", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please provide your phone number."
                                    }
                                ]
                            })(<Input placeholder={"Please provide your phone number"} name={"phone"} />)}
                        </Form.Item>
                        <Form.Item label={"Email"}>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please fill in your email."
                                    }
                                ]
                            })(
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Please Enter your email address"}
                                />
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" size={"large"} htmlType="submit">
                                Save Client
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

clientForm = Form.create({ name: "client_form" })(clientForm);
