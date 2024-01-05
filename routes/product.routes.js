import express from "express";

const router = express.Router();
let productList = [];

//add product
router.post("/product/add", (req, res) => {
  //extract new product form req.body
  const newProduct = req.body;

  //push new product to productList
  productList.push(newProduct);
  return res.status(200).send({ message: "Product is added successfully." });
});

//get product list
router.get("/product/list", (req, res) => {
  return res.status(200).send(productList);
});
//delete product
router.delete("/product/delete/:id/", (req, res) => {
  const productIdToBeDeleted = +req.params.id;

  const newProductList = productList.filter((item, index, self) => {
    return item.id !== productIdToBeDeleted;
  });
  productList = structuredClone(newProductList);
  return res.status(200).send({ message: "Product is deleted successfully." });
});

//edit product
router.put("/product/edit/:id", (req, res) => {
  //extract product id to be edited from req.params
  const productIdToEdited = +req.params.id;
  //extract new value from req.body
  const newValues = req.body;
  //check if provided if exist
  const requiredProduct = productList.find((item, index, self) => {
    if (item.id === productIdToEdited) {
      return item;
    }
  });
  //if provided id not exist
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist" });
  }
  //if provided id is matched
  const newProductList = productList.map((item, index, self) => {
    if (item.id === productIdToEdited) {
      return { ...item, ...newValues };
    } else {
      return item;
    }
  });
  productList = structuredClone(newProductList);
  //send appropriate response
  return res.status(200).send({ message: "Product is updated successfully." });
});
export default router;
