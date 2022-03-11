import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

export default function HomeEmployer(props) {
  let navigate = useNavigate();
  const [usercards, setusercards] = useState([]);
  const [totalcards, settotalcards] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "employer") {
      navigate("/homeemployer");
    }
    getAllUsers();
    filterUsers();
    // eslint-disable-next-line
  }, []);
  async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/api/auth/getAllusers`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    settotalcards(data);
    setusercards(data);
  }

  function filterUsers() {
    console.log(totalcards);
    const res = totalcards.filter((card) => {
      return (
        card.enrolledUnder === "Google" &&
        card.role === "employee"
      );
    });
    console.log(res);
    setusercards(res);
  }

  return (
    <div className="container">
      <div className="container">
        <h1>Discover Your Employee</h1>
        {
          <div className="col-12 mt-3">
            <div className="row">
              {usercards.map((usercards, index) => (
                <div className="col-xl-3 col-md-6 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      width="500"
                      height="250"
                      src={usercards.img}
                      className="card-img-top"
                      alt={usercards.name}
                    />
                    <div className="card-body">
                      <h4> {usercards.name}</h4>
                      <h4>Email: {usercards.email}</h4>
                      <Link
                        to={`/viewProfile/${usercards._id}`}
                        className="btn btn-primary"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
