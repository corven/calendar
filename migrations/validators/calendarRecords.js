module.exports = {
  $and: [{
    startDate: { $type: 'date' },
    endDate: { $type: 'date' },
    status: {
      $type: 'string',
      $in: ['work', 'remoteWork', 'sick', 'vacation'],
    },
  }],
};
