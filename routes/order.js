const express = require("express");
const router = express.Router();
//Models
const Orders = require("../models/orders");
const Users = require("../models/user");

router.get("/count", async function (req, res, next) {
  var data = await Orders.aggregate([
    {
      $group: {
        _id: "$userId",
        noOfOrders: { $sum: 1 },
        averageBillValue: { $avg: "$subtotal" },
      },
    },
  ]);
  Users.populate(data, { path: "_id", select: "name" })
    .then((result) => {
      result = result.map((el) => {
        const container = {};
        container["name"] = el._id.name;
        container["userId"] = el._id._id;
        container["noOfOrders"] = el.noOfOrders;
        container["averageBillValue"] = el.averageBillValue;
        return container;
      });
      return res.status(200).json({
        message: "All Orders",
        totalData: result,
      });
    })
    .catch((err) => { // Need to send error
      res.status(400).json({
        message: "Error Occured",
        error: err,
      });
    });
});

router.post("/create", async function (req, res, next) {
  Orders.create(req.body)
    .then((result) => {
      res.status(200).json({
        message: "Order Added",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error Occured",
        error: err,
      });
    });
});

router.get("/all", async function (req, res, next) {
  return res.status(200).json({
    message: "All Orders",
    data: await Orders.find({}),
  });
});

module.exports = router;
