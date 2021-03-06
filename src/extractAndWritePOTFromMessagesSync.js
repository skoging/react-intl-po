/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import * as R from 'ramda';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import potFormater from './potFormater';
import potHeader from './potHeader';

function extractAndWritePOTFromMessagesSync(
  srcPatterns,
  {
    messageKey = 'defaultMessage',
    messageValue = null,
    messageContext = '',
    language,
    output,
    headerOptions,
  },
) {
  const result = R.pipe(
    readAllMessageAsObjectSync,
    // 1. Object { messagekey: { messageContext: [[] , []] } }
    potFormater(messageValue),
    // 2. String: pot formated
    R.concat(
      potHeader({
        potCreationDate: new Date(),
        charset: 'UTF-8',
        encoding: '8bit',
        language,
        ...headerOptions,
      }),
    ),
    // 3. String: with pot head
  )(srcPatterns, messageKey, messageContext);

  mkdirp.sync(path.dirname(output)); // ensure the output folder exists

  // Output
  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOTFromMessagesSync;
