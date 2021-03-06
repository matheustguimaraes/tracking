import axios from "axios";
import React, { Component } from "react";

import { Button, Container, LinkContainer } from "../common/layout/Layout";
import {
  HeaderForm,
  HeaderInput,
  OuterContainer,
  Description,
} from "../common/layout/Form";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiURL: "http://localhost:8080",
      name: "",
      email: "",
      address: "",
      number: "",
      userId: "",
      isLoaded: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    const userId = url.substr(url.lastIndexOf("/") + 1);

    this.setState({
      userId: parseInt(userId),
      isLoaded: true,
    });
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = (event) => {
    axios
      .post(`${this.state.apiURL}/user`, {
        name: this.state.name,
        address: this.state.address,
        number: this.state.number,
        email: this.state.email,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <OuterContainer>
          <Container>
            <Description>loading</Description>
          </Container>
        </OuterContainer>
      );
    }

    return (
      <OuterContainer>
        <Container>
          <Button>
            <LinkContainer to="/">voltar</LinkContainer>
          </Button>

          <HeaderForm onSubmit={this.handleSubmit}>
            <Description htmlFor="name">Primeiro name</Description>
            <HeaderInput
              id="name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange("name")}
            />

            <Description htmlFor="email">Email</Description>
            <HeaderInput
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange("email")}
            />

            <Description htmlFor="address">Endereço</Description>
            <HeaderInput
              id="address"
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange("address")}
            />

            <Description htmlFor="number">Telefone</Description>
            <HeaderInput
              id="number"
              name="number"
              type="text"
              value={this.state.number}
              onChange={this.handleChange("number")}
            />

            <br />
            <Button>adicionar</Button>
          </HeaderForm>
        </Container>
      </OuterContainer>
    );
  }
}

export default AddUser;
