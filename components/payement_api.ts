import { Data } from "@/datas/types"
import { redirect } from "next/navigation"

export async function createInvoice(sendData:Data) {
    'use server'
    let url: string = ''
    // const rawFormData = {
    //   transaction_amount: formData.get('transaction_amount'),
    //   transaction_currency: formData.get('transaction_currency'),
    //   transaction_reason: formData.get('transaction_reason'),
    //   customer_phone_number: formData.get('customer_phone_number'),
    //   customer_name: formData.get('customer_name'),
    //   customer_email: formData.get('customer_email'),
    //   customer_lang: formData.get('customer_lang:'),
    // }

    
    // console.log(rawFormData)
    // 118a4852-7df8-46d9-834b-23b4ef25aaab  5a219fd9-b249-4a58-b362-1448584ffb42
    try {
      const response = await fetch('https://my-coolpay.com/api/118a4852-7df8-46d9-834b-23b4ef25aaab /paylink', {
        method: 'POST',
        body: JSON.stringify(sendData),
      })
 
      // Handle response if necessary
      const data = await response.json()
      console.log(data)
      if(data.status == 'success'){
        url = data.payment_url;
        console.log(url)
      } 
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    }
    if(url !== "")redirect(url)
  }