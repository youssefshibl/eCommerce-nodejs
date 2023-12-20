const PaymentType = require("../models/PaymentType");




async function add(req, res) {
  if (!req.body.method) {
    return res.status(400).send("Method is required");
  }
  if (!req.body.description) {
    return res.status(400).send("Description is required");
  }
  if (!req.body.status) {
    return res.status(400).send("Status is required");
  }
  let paymentType = new PaymentType({
    method: req.body.method,
    description: req.body.description,
    status: req.body.status,
  });
  paymentType = await paymentType.save();
  if (!paymentType) {
    return res.status(500).send("The payment type cannot be created");
  }
  return res.status(200).send({
    success: true,
    data: paymentType,
  });
}

module.exports = {
  add,
};
