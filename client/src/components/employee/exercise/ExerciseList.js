import React, {useState, useEffect} from 'react'

const ExerciseList = () => {
    const [exercise, setExercise] = useState([])
    async function fetchExercise () {
        const response = await fetch(`http://localhost:5001/api/exercise/fetchExercise`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        })
        const res = await response.json()
        var abc = []
        for(var i = 0; i< res.length; i=i+2){
            abc.push(res[i])
        }
        setExercise(abc)
    }
    useEffect(async () => {
        console.log(fetchExercise())
    }, [])
  return (
    <div className='container'>
        <table className='table table-striped table-dark text-center'>
            <thead>
                <tr>
                <th>Exercise Name</th>
                <th>Calories Burnt</th>
                </tr>  
            </thead>
            <tbody>
                {exercise && exercise.map((e, i)=> {
                    if(e.exerciseName){
                        return(
                            <tr key={i}>
                                <td>{e.exerciseName}</td>
                                <td>{e.caloriesBurnt}</td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ExerciseList