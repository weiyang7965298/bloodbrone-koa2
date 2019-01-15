const weaponOperator = require('./weapon/operator')
const accountOperator = require('./account/operator')

module.exports = {
  saveWeapon: () => {
    weaponOperator.save()
  },
  saveAccount: () => {
    accountOperator.save()
  }
}