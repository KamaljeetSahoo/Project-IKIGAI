const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

router.post("/addExercise", fetchUser, async(req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id)
        const date = new Date()
        const currentDate = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
        
        if (user.food == "undefined"){
            const foodObject = {
                date: currentDate,
                foodList: [
                    {
                        foodName: 'apple',
                        calories: 20,
                        quantity: '2kg'
                    }
                ]
            }
            await user.food.push(foodObject)
        }
        else if (user.food[user.food.length-1].date === currentDate) {
            const foodList =  {
                    foodName: 'apple',
                    calories: 20,
                    quantity: '2kg'
                }
            
            await user.food[user.food.length-1].foodList.push(foodList)
        }
        else {
            const foodObject = {
                date: currentDate,
                foodList: [
                    {
                        foodName: 'apple',
                        calories: 20,
                        quantity: '2kg'
                    }
                ]
            }
            await user.food.push(foodObject)
        }

        await user.save()
        res.send(user)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;