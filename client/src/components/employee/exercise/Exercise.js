import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [query, setquery] = useState("");
  const [exercise, setexercise] = useState([
    {
      exerciseName: "",
      caloriesBurnt: "",
    },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (localStorage.getItem("role") === "employer") {
      navigate("*");
    }
    getUser();
  }, []);

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

  async function fetchExercise(data) {
    console.log(data, typeof data);
    const response = await fetch(
      "https://trackapi.nutritionix.com/v2/natural/exercise",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "19dae9d9",
          "x-app-key": "0c90262650ffa31caca86100a8c34e48",
        },
        body: JSON.stringify({ query }),
      }
    );
    const resp = await response.json();
    setexercise([
      ...exercise,
      {
        exerciseName: resp.exercises.user_input,
        caloriesBurnt: resp.exercises.nf_calories,
      },
    ]);
    console.log(resp.exercises[0].nf_calories);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="input-group mb-3">
          <input
            className="form-control mr-sm-6"
            placeholder='Enter your workout, Eg - "ran 3 miles"'
            value={query}
            onChange={(e) => setquery(e.target.value)}
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
          <button
            className="btn btn-primary my-2 my-sm-0 mx-2"
            type="submit"
            onClick={fetchExercise}
          >
            <i className="fas fa-search" style={{ borderRadius: "4px" }}></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Exercise;
