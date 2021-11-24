import axios from 'axios'
/**
 * @function initializeTransaction to start a transaction
 * @param email the email to send the details of the transaction to
 * @param amount the amount the user is paying for
 * @returns an array, if there is no error the array contains the reference to the transaction, the authorization_url for completing the transaction and null for error. If there is an error with the network request, the reference and authorization url is null while there is a value for error
 */
export const initializeTransaction = async (email: string, amount: number) => {
 const res = await axios({
  method: 'post' ,
  url: 'https://api.paystack.co/transaction/initialize',
  headers: {
     'Authorization': `Bearer ${process.env.PAYSTACK_PRIVATE_API_KEY}`,
     'Content-Type': 'application/json'
   },
   data: JSON.stringify({email, amount})
 }) 

 if (res.status == (200 || 201)) {
   console.log(res.status)
   const data:any = await res.data
  //  console.log(data)
   return [ data.data.reference, data.data['authorization_url'], null ]
 } else {
    const data = await res.data;
    console.log(res.status, data)
    return [ null, null, data ]
 }
}

/**
 * @function verifyTransaction to check the status of a transaction
 * @param reference the of the transaction
 * @returns an array, if there is no error the array contains the status of the transaction and null for error. If there is an error with the network request, the status is null while there is a value for error
 */
export const verifyTransaction = async (reference: string) => {
  const res = await axios({
    method: 'get',
    url: `https://api.paystack.co/transaction/verify/${reference}`,
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_PRIVATE_API_KEY}`
    }
  })

  if (res.status === (200 || 201)) {
    console.log(res.status)
    const data:any = await res.data;
    console.log(data)
    return [ data.data.status, null ]
  } else {
    const data = await res.data;
    console.log(data)
    return [null, data]
  }
}

