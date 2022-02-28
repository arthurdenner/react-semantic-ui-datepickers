const { readdir, readFile } = require('fs').promises;
const path = require('path');

const localesFolder = path.resolve(__dirname, '../src/locales');
const expectedKeys = JSON.stringify([
  'todayButton',
  'nextMonth',
  'previousMonth',
  'nextYear',
  'previousYear',
  'weekdays',
  'months',
]);

async function validateFile(locale) {
  const filePath = path.resolve(localesFolder, locale);
  const localeFile = JSON.parse(await readFile(filePath));
  const localeKeys = JSON.stringify(Object.keys(localeFile));

  if (expectedKeys !== localeKeys) {
    throw new Error(`${locale} has different keys than expected.`);
  }
}

async function validateLocales() {
  const files = await readdir(localesFolder);
  const results = await Promise.allSettled(files.map(validateFile));
  const errors = results
    .filter((r) => r.status === 'rejected')
    .map((r) => r.reason.message);

  if (errors.length > 0) {
    console.error(errors);
    process.exit(1);
  }
}

validateLocales();
