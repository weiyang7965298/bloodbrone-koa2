const weaponOperator = require('./weapon/operator')
const userOperator = require('./user/operator')

module.exports = {
  saveWeapon: () => {
    weaponOperator.save()
  },
  saveUser: () => {
    userOperator.save()
  }
}