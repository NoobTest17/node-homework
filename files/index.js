const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const fileJSON = require('./test.json');

const checkBrackets = (str) => {
  const open = ['(', '{', '['];
  const close = [')', '}', ']'];
  const stack = [];

  let openIdx, closeIdx;

  str = str.split('');

  for (let i = 0; i < str.length; i++) {
    openIdx = open.indexOf(str[i]);
    if (openIdx !== -1) {
      stack.push(openIdx);
      continue;
    }

    closeIdx = close.indexOf(str[i]);
    if (closeIdx !== -1) {
      openIdx = stack.pop();
      if (closeIdx !== openIdx) return false;
    }
  }

  return stack.length === 0
}

const program_console = () => {
  const [_, __, ...array] = process.argv;

  return checkBrackets(array.join(''));
}

const program_file = () => {
  const file = fs.readFileSync('./text.txt', {encoding: 'utf8'});
  fs.writeFileSync('./text.txt', file + '\n' + checkBrackets(file));
}

const program_file_path = () => {
  const [_, __, path] = process.argv;
  const file = fs.readFileSync(path, {encoding: 'utf8'});
  fs.writeFileSync('./loger.log', checkBrackets(file) + '\n');
}

const parserJSON = () => {
  const results = [];
  fs.createReadStream('tb.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.writeFileSync('test.json', JSON.stringify(results))
    });
}

const isValidJSON = (obj) => {
  const requiredFields = ['name', 'age', 'site'];

  if (typeof fileJSON !== 'object') {
    return {isValid: false, message: 'Это не JSON файл!'}
  }

  if (Array.isArray(fileJSON)) {
    return {isValid: false, message: 'Не является объектом!'}
  }

  for (let name of requiredFields) {
    if (!obj[name]) {
      return {isValid: false, message: `Отсутствует обязательное поле`}
    }
  }

  return {isValid: true, message: ''}
}

const writeJSONFile = (obj) => {
  fs.writeFileSync('newTest.json', JSON.stringify(obj));
}

const readJSONFile = (path) => {
  try {
    const isJSON = isValidJSON(fileJSON);

    if (!isJSON.isValid) throw new Error(isJSON.message);
    fileJSON.good = "Zer Good)))";
    writeJSONFile(fileJSON);

  } catch (e) {
    return e.message
  }
}



