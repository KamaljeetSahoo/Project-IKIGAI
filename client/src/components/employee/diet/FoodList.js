import React, {useState, useEffect} from 'react'

const FoodList = () => {
    const [food, setFood] = useState([])
    async function fetchFood () {
        const response = await fetch(`http://localhost:5001/api/diet/fetchFood`, {
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
        setFood(abc)
    }
    useEffect(async () => {
        console.log(fetchFood())
    }, [])
  return (
    <div className='container'>
        <table className='table table-striped table-dark text-center'>
            <thead>
                <tr>
                <th>Food Name</th>
                <th>img</th>
                <th>quantity</th>
                <th>Calories</th>
                </tr>  
            </thead>
            <tbody>
                {food && food.map((f, i)=> {
                    if(f.foodName){
                        return(
                            <tr key={i}>
                                <td>{f.foodName}</td>
                                <td><img alt="abcd" height={50} width={50} src={`${f.imgLink}`}/></td>
                                <td>{f.quantity}</td>
                                <td>{f.calories}</td>
                            </tr>
                        )
                    }
                })}
            </tbody>
        </table>
    </div>
  )
}

export default FoodList