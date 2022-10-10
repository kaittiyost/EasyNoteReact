import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Form, Button, Container, FloatingLabel } from "react-bootstrap";

const AddNote = () => {
  const [notes, setNote] = useState({});
  const navigate = useNavigate();
  let tag_arr="";
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNote((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(notes.title);
    // console.log(notes.detail);
    try {
        tag_arr = notes.tag.split(" ");
    } catch (error) {
        //navigate('/Login')
    }
    // send API
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      note_name: notes.title,
      note_detail: notes.detail,
      category_arr: tag_arr,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/add_note", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.message === 'ok'){
            navigate('/MyNote')
        }else{
            alert('error try again!')
            navigate('/Login')
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Container className="p-5">
      <Form  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter Title"
            value={notes.title || ""}
            onChange={handleChange}
            size="lg"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tag</Form.Label>
          <Form.Control
            name="tag"
            value={notes.tag || ""}
            onChange={handleChange}
            type="text"
            placeholder="#excemple #..."
          />
        </Form.Group>
        <br></br>
        <FloatingLabel controlId="floatingTextarea2" label="Note Here...">
          <Form.Control
            as="textarea"
            placeholder="note here"
            name="detail"
            type="text"
            value={notes.detail || ""}
            onChange={handleChange}
            style={{ height: "300px" }}
          />
        </FloatingLabel>
        <br></br>
        <Button variant="dark" type="submit">
        Save
        </Button>
      </Form>
    </Container>
  );
};

export default AddNote;
