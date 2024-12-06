const express = require("express");
const protectRoute = require("../middleware/authenticateToken");
const {addPurchase, getAllPurchases, updatePurchase, deletePurchase} = require("../Controllers/purchaseController");

const router = express.Router();



router.get("/", protectRoute, getAllPurchases);


router.post("/create",protectRoute, addPurchase);

router.put("/:id", protectRoute, updatePurchase);

router.delete("/:id", protectRoute, deletePurchase);
























module.exports =  router;