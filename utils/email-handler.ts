require('dotenv').config()

// let API_KEY = process.env.SMS_API_KEY;
let DOMAIN = process.env.DOMAIN;
let mailgun = require('mailgun-js')({apiKey: 'key-79a65ef7d65b731c6d04602fc44b278b', domain: DOMAIN});

export type emailOptions = {
  to: string
  from: string
  subject: string
  text: string
}

export let sendEmail = async (opts: emailOptions) => {
  mailgun.messages().send(opts, (error, body) => {
    if(error) {
      throw new Error(error.message)
    }
    console.log(body)
  })
}