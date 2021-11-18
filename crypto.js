const crypto = require('crypto')

let password = 'Hi-Mom';

const salt = crypto.randomBytes(16)

let hash = val => {
  const hash = crypto.createHash('sha256', salt).update(val).digest('hex')
  console.log(hash)
  return `${salt.toString('hex')}-${hash}`
}

let myHash = hash('my-mom');

console.log(myHash, salt.toString('hex'))