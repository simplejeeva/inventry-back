import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get all Customers
router.get("/", async (request, response) => {
  const customers = await client
    .db("billingApp")
    .collection("customers")
    .find()
    .toArray();
  response.send(customers);
});

//to get a customers
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const customers = await client
    .db("billingApp")
    .collection("customers")
    .findOne({ _id: ObjectId(id) });
  response.send(customers);
});

//to insert a stock to db
router.post("/", async (request, response) => {
  const newCustomer = request.body;
  const result = await client
    .db("billingApp")
    .collection("customers")
    .insertOne(newCustomer);
  response.send(result);
});

//to update a customers
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const updateCustomer = request.body;
  const result = await client
    .db("billingApp")
    .collection("customers")
    .updateOne({ _id: ObjectId(id) }, { $set: updateCustomer });
  if (!result) {
    response.send({ message: "error" });
    return;
  }
  response.send(result);
});

//delete a customers
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const result = await client
    .db("billingApp")
    .collection("customers")
    .deleteOne({ _id: ObjectId(id) });
  if (!result) {
    response.send({ message: "error" });
    return;
  }
  response.send({ message: "success" });
});

export default router;
