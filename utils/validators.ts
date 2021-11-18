//  validating email
const isEmail = function (val: string){
  return new RegExp(/^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/).test(val)
}

// // validating passwords
const isPassword = function(val: string){
  return new RegExp(/([a-z]?[A-Z]+[a-z]+[0-9]+)/).test(val)
}

export { isEmail, isPassword }