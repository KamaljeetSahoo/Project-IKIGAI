import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import { Button, Modal } from "react-bootstrap";
import { add } from "date-fns";

const DietChat = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addFood(data) {
    for (var i=0; i<data.foods.length; i++) {
      const name = data.foods[i].food_name;
      const cals = data.foods[i].nf_calories;
      const quantity = data.foods[i].serving_weight_grams;
      const imgLink = data.foods[i].photo.thumb;
      console.log(name, cals, quantity, imgLink)

      const response = await fetch(`http://localhost:5001/api/diet/addFood`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          cals: cals,
          quantity: quantity,
          imgLink: imgLink
        })
      })
      console.log(response.json())
    }
    
    const response = await fetch(`http://localhost:5001/api/diet/addFood`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }

  async function fetchNutrients(data) {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-id": "19dae9d9",
        "x-app-key": "0c90262650ffa31caca86100a8c34e48",
      },
      body: JSON.stringify({
        "query": data,
      })
    })
    const resp = await response.json()
    if(resp !== null){
      addFood(resp)
    }
  }

  const FoodComponent = (props) => {
    const { steps } = props;
    const { userInput } = steps;
    
    fetchNutrients(userInput.message)

    
    return (
      <h3>{userInput.message}</h3>
    )
  }

  const ChatComponent = () => {
		const [food, setFood] = useState('')
    return (
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ChatBot
					headerTitle = "Your Personal AI assistant for analysing food"
          recognitionEnable={true}
          style={{ width: "100%" }}
          steps={[
            {
              id: "intro",
              message: "What did you eat ?",
							trigger: "userInput"
            },
            {
              id: "userInput",
							user: true,
							trigger: "output"
            },
						{
							id: "output",
              component: <FoodComponent/>,
              asMessage: true,
							end: true,
						}
          ]}
        />
      </Modal>
    );
  };
  return (
    <div>
      <Button
        style={{
          position: "absolute",
          right: "14px",
          bottom: "30px",
          cursor: "pointer",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50px",
          backgroundColor: "blue",
          color: "#fff",
          fontSize: "22px",
          border: "none",
        }}
        onClick={handleShow}
      >
        {show ? (
          <i
            className="fa fa-close close"
            style={{ fontSize: "22px", color: "#fff" }}
          ></i>
        ) : (
          <i className="fa fa-commenting-o comment"></i>
        )}
      </Button>
      <ChatComponent />
    </div>
  );
};

export default DietChat;
