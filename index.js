const fs = require('fs');
const path = require('path');

const isAvailability = (fileName) => {
  return fs.existsSync(fileName)
}

const createObjectDir = (dir) => {
  
}

const program = () => {
  const [_, __, ...args] = process.argv;


  const checkFile = args.indexOf('-checkfile');
  if (checkFile !== -1) {
    const isCheckFile = isAvailability(args[checkFile + 1]);
    return {}
  }

  console.log(args)
}

program();