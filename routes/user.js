const express = require("express");
const router = express.Router();
//Models
const Orders = require("../models/orders");
const Users = require("../models/user");

router.post("/", async function (req, res, next) {
  Users.create(req.body)
    .then((result) => {
      res.status(200).json({
        message: "User Added",
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).json({
        message: "Error Occured",
        error: err,
      });
    });
});

router.put("/user", async function (req, res, next) {
  const data = await Orders.aggregate([
    { $group: { _id: "$userId", noOfOrders: { $sum: 1 } } },
  ]);
  if(data.length){
      for(var i=0;i<data.length;i++){
        Users.findByIdAndUpdate({_id:data[i]._id},{$set:{noOfOrders:data[i].noOfOrders}},{ new: true, useFindAndModify: false })
              .then(result => {
                console.log(result)
              })
              .catch(err => {
                console.log(err)
              })
      }
      res.status(200).json({
        success:true,
        message:'successfully updated'
      })
  }else{
    res.status(404).json({
      message:"user not found"
    })
  }
});

router.get("/all", async function (req, res, next) {
  return res.status(200).json({
    message: "All Users",
    data: await Users.find({}),
  });
});

module.exports = router;
