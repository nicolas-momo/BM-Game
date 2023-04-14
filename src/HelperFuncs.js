const shrinkNum = (value) => {
  value = String(value);

  if (!isNaN(value)) {
    const valueInt = parseInt(value);

    if (valueInt > 1000000) {
      value = `${(valueInt / 1000000.00).toFixed(1)}M`;
    } else {
      if (valueInt > 1000) {
        value = `${(valueInt / 1000.0).toFixed(1)}k`;
      }
    }
  }
  return value;
}

module.exports = {
  shrinkNum,
}