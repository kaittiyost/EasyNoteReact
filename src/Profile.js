import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";


export const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetch("http://localhost:5000/get_customer_data", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === '1') {
          setIsLoaded(false);
          setUser(result.data[0])
        } else {
          navigate("/Login");
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const logout = () =>{
    localStorage.removeItem('token')
    navigate('/Login')
  }
  if (isLoaded) {
    return <div>Loading</div>;
  } else {
    return (
        <Container>
     
    <Card className="p-5 mt-3">
    <div>
        <h1>Profile</h1>
        <center>
        <img src="https://cdn-icons-png.flaticon.com/512/4825/4825038.png" width="100px"></img>
        <div>{user.name} {user.surname}</div>
        <div>Username : {user.username}</div>
        <div>เป็นสมาชิกเมื่อ : {user.time_reg}</div>
        <br></br>
        <Button variant="secondary" onClick={logout}>Logout</Button>
        </center>
    </div>
    </Card>
        </Container>
   );
  }
};

export default Profile;
