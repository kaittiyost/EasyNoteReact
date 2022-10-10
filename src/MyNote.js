import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

const MyNote = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [noteList, setNoteList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pageNumber, setPageNumber] = useState();
  const navigate = useNavigate();
  let noteData;

  useEffect(() => {
    getData("");
    getDataCategory();
  }, []);

  const getDataCategory = () => {
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

    fetch("http://localhost:5000/get_note_category", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "ok") {
          setCategoryList(result.data);
        } else {
          //navigate("/Login");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const getData = (tag) => {
    var requestOptions;
    var myHeaders;
    let data;
    myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    myHeaders.append("Content-Type", "application/json");

    if(tag == ""){
   
    requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    }else{
      data = {
        "tag":tag
      }
      myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");
  
      requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(data),
      };
    }


    fetch("http://localhost:5000/get_note_data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "ok") {
          setIsLoaded(false);
          setNoteList(result.data);
          noteData = JSON.parse(JSON.stringify(result.data));
          setPageNumber(result.pageNumber);
        } else {
          //navigate("/Login");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const getByCategory = (tag_name) =>{
    getData(tag_name)
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
        if (result.message === "ok") {
          getData("");
          getDataCategory();
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
            <Col md={2}>
                <div className="p-2">
                  {categoryList.map((category, index) => {
                    return (
                      <button className="btn btn-outline-secondary w-100 mb-2 text-left"  onClick={() => getByCategory(category.category_name)} key={index}>
                        <h4>
                          {category.category_name} ({category.c})
                        </h4>
                      </button>
                    );
                  })}
                </div>
            </Col>
            <Col md={10}>
              <Row>
                {noteList.map((note, index) => {
                  return (
                    <Col md={3} key={index}>
                      <div>
                        <Card
                          className="p-2 alert bg-warning"
                          style={{ height: "350px" }}
                        >
                          <Row>
                            <Col className="col-10">
                              <h5>{note.note_name}</h5>
                            </Col>
                            <Col className="col-2">
                              <button
                                className="btn btn-dark"
                                onClick={() => delNote(note.id)}
                              >
                                X
                              </button>
                            </Col>
                          </Row>
                          <div style={{ overflow: "scroll" }}>
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
            </Col>
          </Row>

          {/* <div>
            <Button className="m-1 btn btn-light">1</Button>
            <Button className="m-1  btn btn-light">2</Button>
            <Button className="m-1  btn btn-light">3</Button>
            <Button className="m-1  btn btn-light">Next</Button>
          </div> */}
        </div>
      </Container>
    );
  }
};

export default MyNote;
