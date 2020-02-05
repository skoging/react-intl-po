import potFormater from '../src/potFormater';

test('should return a function', () => {
  expect(typeof potFormater(null)).toBe('function');
});

test('should return pot formatted string', () => {
  expect(
    potFormater(null)({
      'Go to MCS website': {
        '': [
          {
            id: 'App.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/App/App.json',
          },
          {
            id: 'NotFound.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/NotFound/messages.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with null or undefined description', () => {
  expect(
    potFormater(null)({
      'Go to MCS website': {
        '': [
          {
            id: 'NotFound.errorButton',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/NotFound/messages.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with multi line values', () => {
  expect(
    potFormater(null)({
      'NotFound.errorButton': {
        '': [
          {
            id: 'NotFound.errorButton',
            description: 'My description\nis\nquite\nlong.',
            defaultMessage: 'This is\nmultiline',
            filename: './messages/src/containers/NotFound/messages.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with double quotes escaped', () => {
  expect(
    potFormater(null)({
      'This is "quoted"': {
        '': [
          {
            id: 'NotFound.errorButton',
            description: 'My description\nis\nquite\nlong.',
            defaultMessage: 'This is "quoted"',
            filename: './messages/src/containers/NotFound/messages.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return pot formatted string, with message context', () => {
  expect(
    potFormater(null)({
      'Go to MCS website': {
        'App.errorButton': [
          {
            id: 'App.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/App/App.json',
          },
        ],
        'NotFound.errorButton': [
          {
            id: 'NotFound.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/NotFound/messages.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return po formatted string, with message value', () => {
  expect(
    potFormater('defaultMessage')({
      'App.errorButton': {
        '': [
          {
            id: 'App.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go to MCS website',
            filename: './messages/src/containers/App/App.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});

it('should return po formatted string, with multiline message value', () => {
  expect(
    potFormater('defaultMessage')({
      'App.errorButton': {
        '': [
          {
            id: 'App.errorButton',
            description: 'Click error Button',
            defaultMessage: 'Go\nto\nMCS website',
            filename: './messages/src/containers/App/App.json',
          },
        ],
      },
    }),
  ).toMatchSnapshot();
});
