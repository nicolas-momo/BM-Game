const enemyData = require('./enemyData');
const { allyData, generateFantasyName } = require('./allyData');
const xpData = require('./xpData');
const { itemData, applyItem, removeItem } = require('./itemData')

module.exports = {
  enemyData,
  allyData,
  xpData,
  generateFantasyName, 
  itemData,
  applyItem,
  removeItem,
};