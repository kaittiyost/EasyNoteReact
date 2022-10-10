import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

export const Login = () => {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    // send API
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          localStorage.setItem("token", result.access_token);
          navigate("/Profile");
        } else {
          alert("Username or Password Incorrect!");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Container className="mt-5 p-3">
      <Card className="p-5">
        <h1 className="text-center mb-5">Welcome to Easy Note</h1>
        <Row>
          <Col className="col-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6857/6857419.png"
              width="200px"
            ></img>
          </Col>
          <Col className="col-9">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Enter email"
                  value={inputs.username || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <a href="/Register">register now</a>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
    // <form onSubmit={handleSubmit}>
    //   <br />
    //   <label>
    //     Enter your name:
    //     <input
    //       type="text"
    //       name="username"
    //       value={inputs.username || ""}
    //       onChange={handleChange}
    //     />
    //   </label>{" "}
    //   <br />
    //   <br />
    //   <label>
    //     Enter your password:
    //     <input
    //       type="password"
    //       name="password"
    //       value={inputs.password || ""}
    //       onChange={handleChange}
    //     />
    //   </label>
    //   <br />
    //   <input type="submit" />
    // </form>
  );
};

export default Login;
