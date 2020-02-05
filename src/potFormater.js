/**
 * Ensure that multi-line strings are properly commented out
 *
 * For instance:
 * This is\nmy multi-line\ncomment
 *
 * should be escaped as :
 * #. This is
 * #. my multi-line
 * #. comment
 *
 * @param {String} commentPrefix
 * @param {String} rawComment
 * @returns {String}
 *
 * @author Guillaume Boddaert
 */
const potCommentMultiLineWrapper = (commentPrefix, rawComment) => {
  const comments = rawComment.split('\n');
  return comments.reduce((a, b) => `${a}${commentPrefix} ${b}\n`, '');
};

/**
 * Formatting POT comments
 * @param {Object[]} messageList
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 * @author Guillaume Boddaert
 */
const potCommentsFormater = messageList =>
  messageList.reduce((acc, { filename, id, description, defaultMessage }) => {
    let out = acc;
    out += potCommentMultiLineWrapper('#:', filename);
    if (description) {
      out += potCommentMultiLineWrapper('#.', `[${id}] - ${description}`);
    } else {
      out += potCommentMultiLineWrapper('#.', `[${id}]`);
    }
    out += potCommentMultiLineWrapper(
      '#.',
      `defaultMessage is:\n${defaultMessage}`,
    );

    return out;
  }, '');

/**
 * Formatting POT strings
 * @param {String} str
 * @return {String}
 *
 * @author Tore Hammervoll
 */
const potStringFormatter = (str = '') =>
  str
    .split('\n')
    .map((s, idx, arr) => (idx < arr.length - 1 ? `${s}\n` : s))
    .map(s => `${JSON.stringify(s)}`)
    .join('\n')
    .concat('\n');

/**
 * Formatting POT contexts
 * @param {String} messageContext
 * @return {String}
 *
 * @author Sandy Suh
 */
const potContextsFormater = messageContext =>
  messageContext ? `msgctxt ${potStringFormatter(messageContext)}` : '';

/**
 * Formatting POT comments
 * @param {Object} messageObject
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 */

const potFormater = messageValue => messageObject =>
  Object.keys(messageObject) // return array of id
    .sort()
    .map(id =>
      Object.keys(messageObject[id])
        .map(
          context =>
            `${potCommentsFormater(
              messageObject[id][context],
            )}${potContextsFormater(context)}msgid ${potStringFormatter(
              id,
            )}msgstr ${potStringFormatter(
              messageObject[id][context][0][messageValue],
            )}`,
        )
        .join('\n'),
    )
    .join('\n');

export default potFormater;
