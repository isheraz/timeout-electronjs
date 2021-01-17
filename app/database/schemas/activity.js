const activitySchema = {
  version: 0,
  title: 'Stores every activity history of the user.',
  keyCompression: true,
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    startedAt: {
      type: 'string',
    },
    durationInMinutes: {
      type: 'number',
    },
    startedBy: {
      type: 'string',
    },
  },
  required: ['name', 'startedAt'],
};

module.exports = activitySchema;
