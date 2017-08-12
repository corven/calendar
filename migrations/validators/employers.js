module.exports = {
  $and: [{
    _id: { $type: 'int', $exists: true },
    fullName: { $type: 'string', $exists: true },
    email: { $type: 'string', $exists: true },
    phone: { $type: 'string', $exists: true },
    note: { $type: 'string', $exists: true },
    createDate: { $type: 'date' },
    updateDate: { $type: 'date' },
  }],
};
