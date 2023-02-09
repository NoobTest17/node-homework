const fs = require('fs');
const path = require('path');

const sum = (a, b) => {
  return a + b
}

const logger = (funct, args) => {
  const path = 'logger.log';
  const date = new Date();
  const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
  const log = {
    time,
    funct: funct.name,
    argum: [...args],
    result: funct(...args)
  }
  const data = log.time + '-' + log.funct + '-' + JSON.stringify(log.argum) + '-' + log.result;

  fs.access('logger.log', (err) => {
    if (err) {
      fs.writeFileSync(path, data);
    } else {
      fs.appendFileSync(path, '\n' + data);
    }
  })
  // console.log(log)
}

logger(sum, [2, 3])