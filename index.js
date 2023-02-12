const fs = require('fs');
const path = require('path');

const isAvailability = (fileName) => {
  return fs.existsSync(fileName)
}

const readDirFunct = (pathDir, dir) => {
  const obj = {
    name: dir,
    type: 'dir',
    content: []
  }

  const readDir = fs.readdirSync(path.join(pathDir, dir));
  for (const value of readDir) {
    if (path.extname(value)) {
      console.log('fail --->' + value);
    } else {
      console.log('dir --->' + value)
    }
  }

  return obj
}

const createObjectDir = (pathDir) => {
  const dir = {
    MyDir: {
      name: path,
      type: 'dir',
      content: []
    }
  };

  let filesCount = 0;
  let dirCount = 0;
  const readDir = fs.readdirSync(pathDir)
  for (const value of readDir) {
    if (path.extname(value)) {
      dirCount++;
      dir.MyDir.content.push(readDirFunct(readDir, value))
      console.log('fail --->' + value);
    } else {
      filesCount++;
      console.log('dir --->' + value)
    }
  }

}

const program = () => {
  const [_, __, ...args] = process.argv;


  const checkFile = args.indexOf('-checkfile');
  if (checkFile !== -1) {
    return isAvailability(args[checkFile + 1]);
  }

  const readObjDir = args.indexOf('-readdir');
  if (readObjDir !== -1) {
    return createObjectDir(args[readObjDir + 1]);
  }
}

console.log(program());