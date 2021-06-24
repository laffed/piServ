import express from 'express';
import clocker from './processes/clocker';
import ENV from './config';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('Hello from Karen lol 🙋‍♀️');
});

router.post('/login', async (req, res, next) => {
	const {apiKey, user, pw} = req.body;
	if (apiKey !== ENV.selfApiKey) {
		return res.status(401).json({message: 'Unathorized'})
	}

	let status = await clocker('login', user, pw);
	if (!status.success) {
		return res.json({
			success: false,
			status: false,
			message: 'Oops. Probably need to update your password.'
		});
	} else {
		return res.json({
			success: status.success,
			status: status.status,
			message: ''
		})
	}
});

router.post('/status', async (req, res, next) => {
	const {apiKey, user, pw} = req.body;
	if (apiKey !== ENV.selfApiKey) {
		return res.status(401).json({message: 'Unathorized'})
	}

	let status = await clocker('check', user, pw);
	if (!status.success) {
		return res.json({
			success: false,
			status: false,
			message: 'Oops. Probably need to update your password.'
		});
	} else {
		return res.json({
			success: status.success,
			status: status.status,
			message: ''
		})
	}
});

router.post('/clockme', async (req, res, next) => {
	const {apiKey, user, pw} = req.body;
	if (apiKey !== ENV.selfApiKey) {
		return res.status(401).json({message: 'Unathorized'})
	}

	let status = await clocker('clock', user, pw);
	if (!status.success) {
		return res.json({
			success: false,
			status: false,
			message: 'Oops. Probably need to update your password.'
		});
	} else {
		return res.json({
			success: status.success,
			status: status.status,
			message: ''
		})
	}
})

export default router;