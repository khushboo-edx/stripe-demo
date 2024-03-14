const secretKey =
	'sk_test_51KyE4rKHWVUgUwtWDKSNdVUuZnU1pYK7WcEC6NWiGhu9KI2ccvk1wSCFTopxrSv0eS4FjJvT2pEbvTBINCSrCT2T00bwaorOxX';

const stripe = require('stripe')(secretKey);

/* ------------------------------Payment Intents--------------------------- */
const createPayment = async (req, res) => {
	try {
		console.log({ req });
		console.log('true-----------------------');
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 100,
			currency: 'usd',
			confirm: true,
			payment_method: 'pm_card_visa',
			automatic_payment_methods: {
				enabled: true,
			},
			return_url:
				'https://dashboard.stripe.com/test/logs/req_gfn4zMO9LzSuBu?t=1710408345',
		});
		// console.log({ paymentIntent });
		// const clientSecret = paymentIntent.client_secret;
		// const temp = await stripe.handleCardAction(clientSecret);
		// console.log({ temp, paymentIntent });
		return res.status(200).send({
			status: 200,
			message: 'Payment created successfully',
			data: paymentIntent,
		});
	} catch (error) {
		console.log(error);
		return { status: 500, error: error };
	}
};
const updatePayment = async (req, res) => {
	try {
		console.log({ req });
		const updatePayment = await stripe.paymentIntents.update(
			req.params.id,
			{
				amount: req.body.amount,
			}
		);
		console.log(updatePayment);
		return res.status(200).send({
			status: 200,
			message: 'Payment updated successfully',
			data: updatePayment,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};
const paymentDetails = async (req, res) => {
	try {
		const paymentDetails = await stripe.paymentIntents.retrieve(
			req.params.id
		);
		return res.status(200).send({
			status: 200,
			message: 'Payment retrieve successfully',
			data: paymentDetails,
		});
	} catch (error) {
		return { status: 500, error: error };
	}
};
const paymentList = async (req, res) => {
	try {
		const paymentList = await stripe.paymentIntents.list({
			limit: req.body.limit,
		});
		return res.status(200).send({
			status: 200,
			message: 'Payment list get  successfully',
			data: { count: paymentList.length, data: paymentList },
		});
	} catch (error) {
		return { status: 500, error: error };
	}
};
const cancelPayment = async (req, res) => {
	try {
		const cancelPayment = await stripe.paymentIntents.cancel(req.params.id);
		return res.status(200).send({
			status: 200,
			message: 'Payment cancel successfully',
			data: { data: cancelPayment },
		});
	} catch (error) {
		return { status: 500, error: error };
	}
};
const capturePayment = async (req, res) => {
	try {
		const capturePayment = await stripe.paymentIntents.capture(
			req.params.id
		);
		return res.status(200).send({
			status: 200,
			message: 'Payment captured successfully',
			data: { data: capturePayment },
		});
	} catch (error) {
		return { status: 500, error: error };
	}
};
const confirmPayment = async (req, res) => {
	try {
		const confirmPayment = await stripe.paymentIntents.confirm(
			req.params.id,
			{
				payment_method: req.body.paymentMethod,
				return_url:
					'https://dashboard.stripe.com/test/logs/req_gfn4zMO9LzSuBu?t=1710408345',
			}
		);
		return res.status(200).send({
			status: 200,
			message: 'Payment successfully',
			data: { data: confirmPayment },
		});
	} catch (error) {
		return { status: 500, error: error };
	}
};

/* -----------------------------Payment Charge------------------------------- */
const createCustomer = async (req, res) => {
	try {
		const customer = await stripe.customers.create({
			email: req.body.email,
			source: req.body.stripeToken,
			name: 'user',
		});
		if (customer) {
			let charge = await stripe.charges.create({
				amount: 750,
				description: 'Test charges',
				currency: 'usd',
				customer: customer.id,
			});
			return res.status(200).send({
				status: 200,
				message: 'Payment Successfully',
				data: charge,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

module.exports = {
	createPayment,
	updatePayment,
	paymentDetails,
	paymentList,
	cancelPayment,
	confirmPayment,
	capturePayment,
	createCustomer,
};
