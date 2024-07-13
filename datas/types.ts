export interface Config {
  tax: number;
  promocodes: PromocodeWithDiscount[];
  frequencies: Frequency[];
}
type PromocodeWithDiscount = {
  [key: string]: number;
};

export interface Frequency {
  f: string;
  value: number;
  id:number
}



export  interface Payment {
    id: string;
    author: string;
    cardNumber: string;
    offer: string;
    amount: number;
    date: string;
    validity: string;
  }
  export interface Profile {
    id: number,
    description: string,
    url : string,
    statut:'active'|'inactive'

}
export interface Plan {
  title: string;
  description: string[];
  prix: number;
  content: string;
  statut:'active'|'inactive'
}
export interface PlanData {
  
    
         [key : string]: Plan

}

export interface PaymentAPIdata {
  product_id:string; //l'id du produit que le client paye *
  amount:number; // prix*
  transaction_reason:string; // "reservation" ou "souscription" *
  phone_number :string;// (* pour le paiement mobile) et null pour le paiement par carte
  customer_name :string;// nom du client
  customer_email:string; 
  langague :  string;// langue du client(eng OU fr) en minuscule
  description:string; // decription du produit à payer
  currency:string;
  payment_type:string;   // "mobile" ou "card"
 };

 export interface UserSubscription {
  startDate:Date;
  endDate:Date ;
  status:string;
  methodType:string;
  cardNumber:string|null;
  expirationDate:Date|null;
  cvc:string|null;
  provider:string|null;
  phoneNumber:string|null;
  paypalEmail:string|null;
  category:string;
  amount:number;
  duration:number;

 }

 export interface SubPlan{
  category:string;
  amount:number;
  duration:number;
 }

 export interface PaymentMethod{
  methodType:string;
  cardNumber:string|null;
  expirationDate:Date|null;
  cvc:string|null;
  provider:string|null;
  phoneNumber:string|null;
  paypalEmail:string|null;
 }

