   const Purchase = require("../Models/purchaseModel");




   const addPurchase = async(req, res) => {

    const user = req.user;


       try {
          const {amount, category, itemName, notes, paymentMethod} = req.body;

          if (!amount || !category || !itemName) {
              return res.status(400).json({
                  message: "Please fill all the fields"
              })
          }

          const newPurchase = new Purchase({
            amount, category, itemName, notes, paymentMethod, userId: user._id
          })

          await newPurchase.save();

          return res.status(200).json(
            newPurchase
          )
       } catch (error) {
        console.log("error in addPurchase controller", error.message);
        return res.status(500).json( "Internal server error");
       }
   }


const getAllPurchases = async(req, res) => {
    const user = req.user;
    try {
        const purchases = await Purchase.find({userId: user._id});
        return res.status(200).json(purchases);
    } catch (error) {
      console.log("error in getAllPurchases controller", error.message);
      return res.status(500).json( "Internal server error");
    }
}

const updatePurchase = async(req, res) => {

    const user = req.user;
    const purchaseId = req.params.id;

   const {amount, category, itemName, notes, paymentMethod} = req.body;

    try {
          const purchase = await Purchase.findById(purchaseId);

          if (!purchase) {
            return res.json("Purchase not found")
          }

          if (purchase.userId.toString() !== user._id.toString()) {
            return res.status(403).json("You can only update your own purchases")
          }

          purchase.amount = amount;
          purchase.category = category;
          purchase.itemName = itemName;
          purchase.notes = notes;
          purchase.paymentMethod = paymentMethod;

          await purchase.save();

          res.status(200).json(purchase);
    } catch (error) {
        console.log("error in updatePurchase controller", error.message);
        return res.status(500).json( "Internal server error");
    }
};


const deletePurchase = async(req, res) => {

  const user = req.user;
  const purchaseId = req.params.id;

  try {
    const purchase = await Purchase.findById(purchaseId);
    
    if(!purchase) {
      return res.status(404).json("Purchase not found");
    }

    if (purchase.userId.toString() !== user._id.toString()) {
          return res.status(403).json("You can only delete your own purchases")
       }

       await Purchase.findByIdAndDelete(purchaseId);

       return res.status(200).json("purchase deleted successfully");
  } catch (error) {
    console.log("error in deletePurchase controller", error.message);
    res.status(500).json( "Internal server error");
  }

}











   module.exports = {addPurchase, getAllPurchases, updatePurchase, deletePurchase};