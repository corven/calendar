module.exports = {
  $and: [{
    startDate: { $type: 'date' },
    endDate: { $type: 'date' },
    status: {
      $type: 'string',
      $in: ['status1', 'status2'],
    },
  }],
};
