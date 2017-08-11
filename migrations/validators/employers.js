module.exports = {
  $and: [{
    fullName: { $type: 'string', $exists: true },
    email: { $type: 'string', $exists: true },
    phone: { $type: 'string', $exists: true },
    note: { $type: 'string', $exists: true },
  }],
};
