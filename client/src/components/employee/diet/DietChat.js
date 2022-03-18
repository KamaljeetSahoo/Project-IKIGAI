import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Button, Modal } from "react-bootstrap";

const DietChat = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ChatComponent = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ChatBot
          style={{ width: "100%" }}
          steps={[
            {
              id: "hello-world",
              message: "HEllo World",
              end: true,
            },
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
