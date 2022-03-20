const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

router.post("/addFood", fetchUser, async(req, res) => {
    try{
        const id = req.user.id;
        var { name, cals, quantity, imgLink } = req.body;
        console.log(name,cals,quantity,imgLink)
        
        if (name !== 'undefined'){
            quantity = quantity + ' gm';
            const user = await User.findById(id)
            const date = new Date()
            const currentDate = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()
            if (user.food.length == 0){
                const foodObject = {
                    date: currentDate,
                    foodList: [
                        {
                            foodName: name,
                            calories: cals,
                            quantity: quantity,
                            imgLink: imgLink
                        }
                    ]
                }
                await user.food.push(foodObject)
            }
            else if (user.food[user.food.length-1].date === currentDate) {
                const foodList =  {
                        foodName: name,
                        calories: cals,
                        quantity: quantity,
                        imgLink: imgLink
                    }
                
                await user.food[user.food.length-1].foodList.push(foodList)
            }
            else {
                const foodObject = {
                    date: currentDate,
                    foodList: [
                        {
                            foodName: name,
                            calories: cals,
                            quantity: quantity,
                            imgLink: imgLink
                        }
                    ]
                }
                await user.food.push(foodObject)
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

module.exports = router;