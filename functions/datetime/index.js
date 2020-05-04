const moment = require('moment')

const datetimeLib = {
  now: async () => {
    const now = moment.now();
    return {
      unix: now,
      iso: moment(now).toISOString()
    }
  },
};

exports.handler = async function handler(event) {
  if (!event || !event.method || typeof datetimeLib[event.method] !== 'function') {
    return { error: 'The method property must be a valid and implemented utils function, please take a look at the readme.' }
  }

  try {
    return datetimeLib[event.method](event)
  } catch (error) {
    return { error };
  }
};
 