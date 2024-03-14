const express = require('express');
const path = require('path');

const PORT = '3000';
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const paymentRoutes = require('./routes/payment.route');

const publishableKey =
	'pk_test_51KyE4rKHWVUgUwtWl54j7v86QfLk1noEk5WS5CQydB2MkMyNqJpYm4qkoSmQe9gCFxU3Co0wGOCSpLe4HQIhN97e009mA3fsSd';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('Home', {
		key: publishableKey,
	});
});
app.use('/', paymentRoutes);

app.listen(PORT, () => {
	console.log('*********Port is listening on 3000************');
});
