module.exports = {
  createRest: (status, message) => {
    switch (status) {
    // 如有需要，可以在这里多自定义几个状态，并转为特定的code
    // case 401: return { code: 'UNAUTH' }
    default: return { code: '-1', message: status + ': ' + message }
    }
  }
}