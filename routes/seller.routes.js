import express from "express";

const router = express.Router();
let sellerList = [];

//add seller
router.post("/seller/add", (req, res) => {
  //extract new seller from req.body
  const newSeller = req.body;

  //push new seller to to sellerList
  sellerList.push(newSeller);

  return res.status(200).send({ message: "Seller is added successfully." });
});

//get seller list
router.get("/seller/list", (req, res) => {
  return res.status(200).send(sellerList);
});

//edit seller

export default router;
