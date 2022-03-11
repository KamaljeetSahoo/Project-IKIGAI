import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Water from './waterComp/water'

export default function Home(props) {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (localStorage.getItem("role") === "employer") {
      navigate("*");
    }
    getUser();
  },);

  // Separate function to get user details

  async function getUser() {
    const response = await fetch(`http://localhost:5001/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setProfile(data);
  }
  
  return (
    <div>
      <div className="container">
        <div className="container rounded bg-white">
          <div className="row">
            <div
              className="w3-content w3-margin-top"
              style={{ maxWidth: "1400px" }}
            >
              <div className="w3-row-padding">
                <div className="w3-third">
                  <div className="w3-white w3-text-grey w3-card-4">
                    <div className="w3-display-container">
                      <img
                        src={profile.img}
                        style={{ width: "100%" }}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <br />
                </div>
                <div className="w3-twothird">
                  <div className="w3-container w3-card w3-white w3-margin-bottom">
                    <div className="w3-container">
                      <br />
                      <h2 className="w3-text-grey w3-padding-16">
                        <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>
                        About {profile.name}
                      </h2>
                      <hr />
                      <p>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i>
                        {profile.email}
                      </p>
                      <p>
                        <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-blue"></i>
                        {profile.phone}
                      </p>
                      <p>
                        <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i>
                        {profile.enrolledUnder}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Water/>
    </div>
  );
}
