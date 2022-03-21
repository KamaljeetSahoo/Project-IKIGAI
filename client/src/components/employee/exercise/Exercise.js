import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseList from './ExerciseList'

const Exercise = () => {
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [query, setquery] = useState("");
 

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

  async function addExercise(data) {
    for (var i=0; i<data.exercises.length; i++) {
      const name = data.exercises[i].user_input;
      const cals = data.exercises[i].nf_calories;
      console.log(name, cals)

      const response = await fetch(`http://localhost:5001/api/exercise/addExercise`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          cals: cals,
        })
      })
      console.log(response.json())
    }
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
    console.log(resp);
    if(resp !== null){
      addExercise(resp)
    }
  }

  return (
    <>
      <div className="container mt-5">
      <ExerciseList></ExerciseList>
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
            <i style={{ borderRadius: "4px" }}>Add Exercise</i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Exercise;
