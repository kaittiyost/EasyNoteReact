import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

const MyNote = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [noteList, setNoteList] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const navigate = useNavigate();
  let noteData;

  useEffect(() => {
    getData();
  }, []);

  const getData = () =>{
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/get_note_data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "ok") {
          setIsLoaded(false);
          setNoteList(result.data);
          noteData = JSON.parse(JSON.stringify(result.data));
          setPageNumber(result.pageNumber)
        } else {
          navigate("/Login");
        }
      })
      .catch((error) => console.log("error", error));
  }
  const delNote = (id) => {
    console.log("del id :" + id);
    var myHeaders2 = new Headers();
    var data = JSON.stringify({
      note_id: id,
    });
    myHeaders2.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders2.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders2,
      body: data,
      redirect: "follow",
    };
    fetch("http://localhost:5000/del_note", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.message === 'ok'){      
            getData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
      <Container>
        <div>
          <h1 className="mt-3 mb-5">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/6857/6857494.png"
              width="100px"
            ></img>{" "}
            My Notes           
          </h1>

          <Row>
            {noteList.map((note, index) => {
              return (
                <Col md={3} key={index} >
                  <div>
                    <Card className="p-2 alert bg-warning" style={{height:'350px', }}>
                      <Row>
                        <Col className="col-10">
                        <h5>{note.note_name}</h5>
                        </Col>
                        <Col className="col-2">
                        <button className="btn btn-dark" onClick={() => delNote(note.id)}>X</button>
                        </Col>
                      </Row>
                      <div style={{overflow: 'scroll'}}>
                      <p>{note.detail}</p>
                      </div>
                      <hr />
                      <i>เขียนเมื่อ {note.date}</i>
                    </Card>
                  </div>
                </Col>
              );
            })}
          </Row>
          <div>
            <Button className="m-1 btn btn-light">1</Button>
            <Button className="m-1  btn btn-light">2</Button>
            <Button className="m-1  btn btn-light">3</Button>
            <Button className="m-1  btn btn-light">Next</Button>
          </div>
        </div>
      </Container>
    );
  }
};

export default MyNote;
