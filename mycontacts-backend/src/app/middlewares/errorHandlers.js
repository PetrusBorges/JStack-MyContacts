module.exports = (error, request, response, next) => {
  console.log('error handler', error)
  response.sendStatus(500)
}
