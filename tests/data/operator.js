const weaponOperator = require('./weapon/operator')

module.exports = {
  saveWeapon: () => {
    weaponOperator.save()
  }
}