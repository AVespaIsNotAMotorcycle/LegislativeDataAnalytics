/* The below code is modified from list-react-files,
 * written by @diegohaz and published under the MIT License */
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const globsEX = {
  camelCaseFile: '[A-Z]*.{js,ts}',
  camelCaseDir: '[A-Z]*/{index,[A-Z]*}.{js,ts}',
  jsxFile: '*.{jsx,tsx}'
};

/**
 * List react component files inside a directory
 * dir: str, directory to search
 * ext: str, comma-separated list of file extensions
 */

function listReactFiles (dir, ext) {
  const globs = {
    camelCaseFile: '[A-Z]*.{'.concat(ext, '}'),
    camelCaseDir: '[A-Z]*/{index,[A-Z]*}.{'.concat(ext, '}'),
    jsxFile: '*.{'.concat(ext,'}'),
  };
  const patterns = Object.keys(globs).map(key => globs[key]);
  const pattern = `**/{${patterns.join(',')}}`;
  const ignore = ['**/node_modules/**', '**/{__tests__,tests}/**', '**/*.{spec}.*'];

  return new Promise((resolve, reject) => {
    (0, _glob2.default)(pattern, { dir, ignore }, (err, files) => {
      // istanbul ignore next
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};

/* The above code is modified from list-react-files,
 * written by @diegohaz and published under the MIT License */

/* This function was written by me :)
 * Checks that each .jsx file not named 'constants.jsx'
 * has a corresponding .test.js file
 */
async function checkForTests(dir) {
  const jsxFiles = await listReactFiles(dir, 'jsx,tsx');
  const testFiles = await listReactFiles(dir, 'test.jsx,test.tsx');
  let untestedFiles = jsxFiles.map((jsxFile) => {
    if (jsxFile.includes('test.jsx')) { return; }
    if (testFiles.includes(jsxFile.slice(0,-4).concat('.test.jsx'))) {
        return;
    }
    return jsxFile;
  });
  untestedFiles = untestedFiles.filter((element) => {
    return element !== undefined;
  })
  if (untestedFiles.length !== 0) { return untestedFiles; }
  return false;
}

export default checkForTests;
