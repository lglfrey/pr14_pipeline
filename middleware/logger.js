const winston = require('winston');
require('winston-daily-rotate-file');
const Journal = require('../models/journal');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'isip_o.d.petrov@mpt.ru',
        pass: 'olp#102405',
    },
});

const logToDatabase = async (level, message) => {
    try {
      await Journal.create({
        content: message,
        level: level,
        logicalDelete: false,
      });
    } catch (error) {
      console.error('Error logging to Journal:', error);
    }
  };


const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const levels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

const createLevelFilter = (level) => {
    return winston.format((info) => {
        if (info.level === level) {
            return info;
        }
    })();
};

const transports = levels.map(level =>
    new winston.transports.DailyRotateFile({
        level: level,
        filename: path.join(logDir, `${level}-%DATE%.log`),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        handleExceptions: true,
        handleRejections: true,
        format: winston.format.combine(
            createLevelFilter(level),
            winston.format.label({ label: level }),
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
        )
    })
);

transports.push(
    new winston.transports.DailyRotateFile({
        filename: path.join(logDir, 'combined-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        handleExceptions: true,
        handleRejections: true,
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    })
);


const customLoggingLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta'
  }
};

winston.addColors(customLoggingLevels.colors);

const logger = winston.createLogger({
  levels: customLoggingLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`)
  ),
  transports: transports
});

function sendErrorLogEmail(message) {
    const mailOptions = {
        from: 'isip_o.d.petrov@mpt.ru',
        to: 'olp201915@gmail.com',
        subject: 'Error Log',
        text: message,
    };

    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending mail:', error);
        } else {
            console.log('Mail sent:', info.response);
        }
    });
}

logger.on('logged', (info) => {
    logToDatabase(info.level, info.message).then(() => {
        console.log("Logged to database successfully.");
    }).catch(error => {
        console.error("Failed to log to database:", error);
    });
});


const requestLogger = async (req, res, next) => {
    const message = `Request method: ${req.method}, URL: ${req.originalUrl}, IP: ${req.ip}`;
    await logToDatabase('info', message);
    logger.info(message);
    next();
};

const errorLogger = async (err, req, res, next) => {
    const message = `Error: ${err.message}, User: ${req.body.username || 'Unknown'}, IP: ${req.ip}, Stack Trace: ${err.stack}, Request method: ${req.method}, URL: ${req.originalUrl}`;
    await logToDatabase('error', message);
    logger.error(message);

    sendErrorLogEmail(message);
    
    next(err);
};

module.exports = { requestLogger, errorLogger, logger };