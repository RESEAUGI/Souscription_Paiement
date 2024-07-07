import axios from 'axios'

function finalData ({userId,startDate,endDate,status,paymentDate,category,
    amount,duration,paypalEmail,methodType,cardNumber,expirationDate,
    cvc,provider,phoneNumber
}){
    const data={
        userId: userId,//"ec9e4f82-f7d9-4624-aed6-34ad54e795c9",
    
        startDate: startDate,
    
        endDate :endDate,
        
        status: status,
        
        paymentDate:paymentDate,
    
        category:category,
    
        amount:amount,
    
        duration:duration,
    
        paypalEmail:paypalEmail,

        methodType:methodType,
        //card
        cardNumber:cardNumber,
        
        expirationDate:expirationDate,
    
        cvc:cvc,
        //mobile
        provider:provider,
    
        phoneNumber:phoneNumber
    }

    axios.post("",data)
}

export default finalData
