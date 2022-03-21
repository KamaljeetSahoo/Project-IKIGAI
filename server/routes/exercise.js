const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

router.post("/addExercise", fetchUser, async(req, res) => {
    try{
        const id = req.user.id;
        var { name, cals } = req.body;
        console.log(name,cals)
        
        if (name !== 'undefined'){
            const user = await User.findById(id)
            const date = new Date()
            const currentDate = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
            if (user.exercise.length == 0){
                const exerciseObject = {
                    date: currentDate,
                    exerciseList: [
                        {
                          exerciseName: name,
                          caloriesBurnt: cals,
                        }
                    ],
                    totalCaloriesBurnt: cals,
                }
                await user.exercise.push(exerciseObject)
            }
            else if (user.exercise[user.exercise.length-1].date === currentDate) {
                const exerciseList =  {
                      exerciseName: name,
                      caloriesBurnt: cals,
                    }
                user.exercise[user.exercise.length-1].totalCaloriesBurnt = user.exercise[user.exercise.length-1].totalCaloriesBurnt + cals
                await user.exercise[user.exercise.length-1].exerciseList.push(exerciseList)
            }
            else {
                const exerciseObject = {
                    date: currentDate,
                    exerciseList: [
                        {
                          exerciseName: name,
                          caloriesBurnt: cals,
                        }
                    ],
                    totalCaloriesBurnt: cals,
                }
                await user.exercise.push(exerciseObject)
            }
    
            await user.save()
            res.send(user)
        }
        else{
            res.send(JSON.stringify({"abc":123}))
        }
    }
    catch(error){
        console.log(error)
    }
})

router.get("/fetchExercise", fetchUser, async(req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id)
        //res.send(user)
        res.send(JSON.stringify(user.exercise[user.exercise.length - 1].exerciseList))
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;