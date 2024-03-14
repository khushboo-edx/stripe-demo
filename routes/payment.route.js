const express = require('express');

const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const paymentController = require('../controller/payment');

app.post('/pay', paymentController.createPayment);
app.patch('/pay/:id', paymentController.updatePayment);
app.get('/pay/:id', paymentController.paymentDetails);
app.get('/pay', paymentController.paymentList);
app.post('/pay/:id/cancel', paymentController.cancelPayment);
app.get('/pay/:id/capture', paymentController.capturePayment);
app.post('/pay/:id/confirm', paymentController.confirmPayment);

app.post('/create-customer', paymentController.createCustomer);

module.exports = app;
