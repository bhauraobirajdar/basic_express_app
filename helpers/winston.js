const { createLogger, format, transports } = require('winston')

const { combine, timestamp, label, printf } = format
const moment = require('moment')

const isoTOIST = (date) => moment(date).format('Do MMMM  YYYY, h:mm:ss a')
const colorizer = format.colorize()

const logger = function (module) {
  return createLogger({
    level: 'debug',
    format: combine(
      label({ label: module }),
      timestamp(),
      format.printf((msg) =>
        colorizer.colorize(
          msg.level,
          `${isoTOIST(msg.timestamp)} [${msg.label}] - ${msg.level}: ${
            msg.message
          } `
        )
      )
    ),
    transports: [new transports.Console()],
  })
}
module.exports = { logger }
