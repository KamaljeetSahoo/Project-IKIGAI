import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Water = (props) => {
  // let navigate = useNavigate();
  const [profile, setProfile] = useState(props.profile);
	const [water, setWater] = useState(0);

  useEffect(() => {
    setWater(getWater(profile))
  })

  // Separate function to get user details
	const getWater = (data) => {
		return data.waterIntake[data.waterIntake.length - 1].water
	}

  async function getUser() {
    const response = await fetch(`http://localhost:5001/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setProfile(data);
		setWater(getWater(data))
  }
	async function addWater() {
		try {
			const response = await fetch(`http://localhost:5001/api/auth/addWater`, {
				method: "POST",
				headers: {
					"auth-token": localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			});
			const resp = await response.json();
      getUser()
			console.log(resp)
		}
		catch (error) {
			console.log(error)
		}
	}
  return (
    <div className="container">
      <div className="col-md-3 text-center m-3">
        <div className="card">
          <div className="card-title">
            <h1 className="font-weight-bold">Water</h1>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-md btn-primary" onClick={addWater}>+</button>
            <p>{water} ml</p>
            <button className="btn btn-md btn-primary">-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Water;
