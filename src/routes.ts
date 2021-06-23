import express from 'express';
import clocker from './processes/clocker';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('Hello from Karen lol 🙋‍♀️');
});

router.get('/status', async (req, res, next) => {
	let status = await clocker('check');
	console.log(status);
	if (!status.success) {
		res.send({
			success: false,
			status: false,
			message: 'Oops. Probably need to update your password.'
		});
	} else {
		res.send({
			success: status.success,
			status: status.status,
			message: ''
		})
	}
});

router.get('/clockme', async (req, res, next) => {
	let status = await clocker('clock');
	console.log(status);
	if (!status.success) {
		res.send({
			success: false,
			status: false,
			message: 'Oops. Probably need to update your password.'
		});
	} else {
		res.send({
			success: status.success,
			status: status.status,
			message: ''
		})
	}
})

export default router;