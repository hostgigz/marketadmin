import React, { Component } from "react";
import { Button, Checkbox, Form, Input, Message, Row } from "antd";
import { Eye, Mail, Triangle } from "react-feather";
import { connect } from "react-redux";
import { authenticateAction, login } from "../redux/actions/auth";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
const FormItem = Form.Item;
const Content = styled.div`
  max-width: 600px;
  z-index: 2;
  min-width: 300px;
  border-radius: 10px;
  padding: 40px 150px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
`;
const Logo = styled.div`
  max-width: 300px;
  display: center;
`;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleChange = e => {
    e.preventDefault();
  };

  handleSubmit(e) {
    e.preventDefault();
    login({
      email: this.state.email, password: this.state.password
    },
    "signin")
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { email, password } = this.state;
    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-log mh-page"
            style={{ minHeight: "100vh" }}
        >
          <Logo>
            <Link href="/signin">
              <a className="brand mr-0">
                <Triangle size={32} strokeWidth={1} />
              </a>
            </Link>
          </Logo>
          <Content className="bg-white">
            <div className="text-center mb-5">
              <h2 className="mb-0 mt-3" style={{ fontWeight: "800" }}>
                Sign in
              </h2>
            </div>

            <Form layout="vertical" onSubmit={this.handleSubmit}>

              <FormItem label="Email">
                {getFieldDecorator("email", {
                  initialValue: email,
                  rules: [ { type: "email", message: "The input is not valid E-mail!" }, { required: true, message: "Please input your E-mail!" } ]
                })(
                    <Input
                        prefix={ <Mail size={16} strokeWidth={1} style={{ color: "rgba(0,0,0,.25)", borderRadius: "20px!important" }} /> }
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                    />
                )}
              </FormItem>

              <FormItem label="Password">
                {getFieldDecorator("password", {
                  initialValue: password,
                  rules: [ { type: "password", message: "The input is not valid password" }, { required: true, message: "Please input your password" } ]
                })( 
                    <Input
                        prefix={ <Eye size={16} strokeWidth={1} style={{ color: "rgba(0,0,0,.25)" }} /> }
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <Link href="/forgot">
                  <a className="text-xs-right">
                    <small>Forgot password</small>
                  </a>
                </Link>
                <Button type="primary" htmlType="submit" block className="mt-3">
                  Log in
                </Button>
              </FormItem>

              <div className="text-center">
                <small className="text-muted">
                  <span>Don't have an account yet?</span>
                  <Link href="/signup">
                    <a>&nbsp;Create one now!</a>
                  </Link>
                </small>
              </div>
            </Form>
          </Content>
        </Row>
    );
  }
}
Signin.getInitialProps = ctx => {};
const WrappedNormalLoginForm = Form.create()(Signin);
export default connect(state => state, { login })(
    WrappedNormalLoginForm
);
