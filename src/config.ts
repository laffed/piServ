import {config} from 'dotenv';
import {resolve} from 'path';

config({path: resolve(__dirname, '../.env')});

const ENV = {
	port: process.env.PORT,
	selfApiKey: process.env.SELF_KEY,
	cncUsr: process.env.CNC_USR,
	cncPw: process.env.CNC_PW,
	driverPath: process.env.DRIVER_PATH,
	sgKey: process.env.SENDGRID_KEY,
	sgFrom: process.env.SG_FROM,
	sgTo: process.env.SG_TO
}

export default ENV;