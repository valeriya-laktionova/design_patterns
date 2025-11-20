import pino from 'pino';

const logger = pino({ level: 'debug' }, pino.destination('./logs/app.log'));

export default logger;
