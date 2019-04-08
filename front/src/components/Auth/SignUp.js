// @flow
import React from 'react';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import db from 'shared/firebaseInit';
import styled, { keyframes } from 'styled-components';
import { SignUpContainer, Form, StyledH1, SocialContainer, SocialA, StyledSpan, StyledInput, StyledButton } from 'components/Auth/Style';

@inject("authToggle")
@observer
class SignUp extends React.Component {
  @observable userName = ''
  @observable email = ''
  @observable passwords = ''

  render() {
    const { userName, email, password } = this
    const { rightPanelActive, Toggle } = this.props.authToggle;

    return(
      <SignUpContainer rightPanelActive={rightPanelActive}>
        <Form>
          <StyledH1>Create Account</StyledH1>
          <SocialContainer>
            <SocialA><i className="fab fa-facebook-f"></i></SocialA>
            <SocialA><i className="fab fa-google-plus-g"></i></SocialA>
            <SocialA><i className="fab fa-linkedin-in"></i></SocialA>
          </SocialContainer>
          <StyledSpan>or use your email for registration</StyledSpan>
          <StyledInput name="userName" placeholder="Name" onChange={this.onChange} value={userName} />
          <StyledInput name="email" placeholder="Email" onChange={this.onChange} value={email} />
          <StyledInput
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            value={password}
          />
          <StyledButton onClick={this.onSubmit}>Sign Up</StyledButton>
        </Form>
      </SignUpContainer>
    )
  }
  
  @action.bound
  onChange(event) {
    const { name, value } = event.target;
    this[name] = value;
    console.log(name, value);
  }

  @action.bound
  onSubmit() {
    const { userName, email, password } = this
    const userRef = db.collection('users').add({
      userName: userName,
      email: email,
      password: password
    });
  }
}

export default SignUp;