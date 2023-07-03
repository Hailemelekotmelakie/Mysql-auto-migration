function map(item) {
  return item.map((val) => {
    return {
      id: val.id,
      firstName: val.firstName,
      LastName: val.LastName,
      address: val.address,
      birthDate: val.birthDate,
      time: val.time,
    };
  });
}

module.exports = map;
