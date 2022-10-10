import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

const Register = () => {
  const [inputs, setInputs] = useState({});

  const [validName, setValidName] = useState("");
  const [validSurname, setValidSurname] = useState("");
  const [validUsername, setValidUsername] = useState("");
  const [validPassword, setValidPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    // const name = event.target.name;
    // const value = event.target.value;

    event.preventDefault();
    console.log(inputs);
    if (!inputs.name || !inputs.surname || !inputs.username || !inputs.password) {
      //alert("กรูณากรอกข้อมูลให้ครบ");
      if (!inputs.name) {
        setValidName("is-invalid");
      } else {
        setValidName("is-valid");
      }
      if (!inputs.surname) {
        setValidSurname("is-invalid");
      } else {
        setValidSurname("is-valid");
      }
      if (!inputs.username) {
        setValidUsername("is-invalid");
      } else {
        setValidUsername("is-valid");
      }
      if (!inputs.password) {
        setValidPassword("is-invalid");
      } else {
        setValidPassword("is-valid");
      }
    } else {
      setValidName("is-valid");
      setValidSurname("is-valid");
      setValidUsername("is-valid");
      setValidPassword("is-valid");
      // send API
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: inputs.name,
        surname: inputs.surname,
        username: inputs.username,
        password: inputs.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5000/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.message === "ok") {
            alert('Register Success')
            navigate("/Login");
          } else {
            alert("Error");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <Container className="mt-5 p-3">
      <Card className="p-5">
        <a href="/Login">Back to Login</a>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="col-md">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className={validName}
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={inputs.name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-md">
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                 className={validSurname}
                  name="surname"
                  type="text"
                  placeholder="Enter surname"
                  value={inputs.surname || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="col-md">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                 className={validUsername}
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col className="col-md">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                 className={validPassword}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button className="ml-2" variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
