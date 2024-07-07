"use client";
import { PaymentMethod, PlanData, SubPlan, UserSubscription } from '@/datas/types';
//import _features from "@/datas/features";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = ({ params }: { params: { plan: string[] } }) => {
   ;
  const profile = parseInt(params.plan[0]);
  const [_features, setFeatures] = useState<PlanData>({
    basic:{
      title: '',
      description: [],
      prix: 0,
      content: ""
    } ,
    premium:{
      title: '',
      description: [],
      prix: 0,
      content: ""
    },
    standart:{
      title: '',
      description: [],
      prix: 0,
      content: ""
    }
  });
  
    useEffect(() => {
      const fetchFeatures = async () => {
        try {
          const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/plans/'+profile);
          setFeatures(response.data);
          //console.log(response.data);
  
        } catch (error) {
          console.error('Erreur lors de la récupération des paiements :', error);
        }
      };
  
      fetchFeatures();
    }, [_features, profile]);
  const choice =(params.plan[1]=='basic')?_features[params.plan[1]] : (params.plan[1]=='standart')?_features.standart :_features.premium;


  const months = parseInt(params.plan[2]);

  const myfeatures = choice.description;
  const transaction_id = "20p524";
  const date = new Date(Date.now());
  const subscription_date = date.toLocaleString();
  const tax = 4;
  const subtotal = choice.prix * months;
  const service_charge = 10;
  const promo_discount = 0;
  const expiryDate = new Date();

  expiryDate.setMonth(date.getMonth() + months);
//const router = useRouter()
  const [isActive, setIsActive] = useState(0);
  const [addressValidated, validateAddress] = useState(false);
  const [credentialConfirmed, confirmCredential] = useState(false);
  const [paymentLaunched,launchPayment] = useState(false);
  // const handleGoBack = () => {
  //   router.back()
  // }
  const userFetcher: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    headers: {'Content-Type': 'application/json','Accept': 'application/json'}
  });  
  const paymentAPI: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    headers: {'Content-Type': 'application/json','Accept': 'application/json'}
  });
  const subscriber: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/subscription',
    timeout: 5000,
    headers: {'Content-Type': 'application/json','Accept': 'application/json'}
  });
  let total_payable_amount =
    subtotal *
    (1 - tax / 100) *
    (1 + service_charge / 100) *
    (1 - promo_discount / 100);
total_payable_amount= parseFloat(total_payable_amount.toFixed(3))


const subplan:SubPlan= {
  category:params.plan[1],
  amount:choice.prix,
  duration:months,
 };
 const paymentMethod:PaymentMethod={
  methodType:isActive==2?'paypal': isActive>2? 'mobile':'card',
  cardNumber:null,
  expirationDate:null,
  cvc:null,
  provider:null,
  phoneNumber:null,
  paypalEmail:null,
 };
 const [formData, setFormData] = useState<UserSubscription>({...subplan,...paymentMethod,
  startDate:date,
  endDate:expiryDate,
  status:'active',

 })
 const [paymentAPIdata, setpaymentAPIdata] = useState({
  product_id:profile+'//'+choice.title, //l'id du produit que le client paye *
  amount:total_payable_amount, // prix*
  transaction_reason:'souscription', // "reservation" ou "souscription" *
  phone_number :formData.phoneNumber,// (* pour le paiement mobile) et null pour le paiement par carte
  customer_name :'',// nom du client
  customer_email:'', 
  langague :  'eng',// langue du client(eng OU fr) en minuscule
  description:profile+'//'+choice.title, // decription du produit à payer
  currency:'FCFA',
  payment_type:formData.methodType,   // "mobile" ou "card"
 })
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
const handleInputChangep = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setpaymentAPIdata({ ...paymentAPIdata, [e.target.name]: e.target.value });
};

  function getPaymentDatas() {
    
// userFetcher.get<any, AxiosResponse<any>>('/users')
// .then(response => {
//   console.log(response.data);
// })
// .catch((error: AxiosError) => {
//   console.error(error);
// });
if (!paymentAPIdata.customer_email|| !paymentAPIdata.customer_name) validateAddress(false)
  paymentAPIdata.amount = total_payable_amount;
paymentAPIdata.phone_number = formData.phoneNumber;

formData.methodType=isActive==2?'paypal': isActive>2? 'mobile':'card';
formData.provider = isActive==3?'mtn':isActive==4?'orange':null;
formData.amount = choice.prix;
setFormData(formData)
if (false) confirmCredential(false)
  
console.log('paymentAPIData : '+JSON.stringify(paymentAPIdata));
console.log('formData : '+JSON.stringify(formData));


 
 

  }

  async function  proceedToPayment() : Promise<Boolean> {
    const res = await paymentAPI.post<any, AxiosResponse<any>>('/paymentAPI', paymentAPIdata)
    return res.data.product_id_hash?  true:false;
    // .then(response => {
    //   // Traiter la réponse
    //   console.log(response.data);
    //   return true
    // })
    // .catch((error: AxiosError) => {
    //   // Gérer les erreurs
    //   console.error(error);
    //   return false
    // });
}
async function  subscribeThen() : Promise<Boolean> {
  const res = await subscriber.post<any, AxiosResponse<any>>('/create', formData)
  return res.data.product_id_hash?  true:false;
  // .then(response => {
  //   // Traiter la réponse
  //   console.log(response.data);
  //   return true
  // })
  // .catch((error: AxiosError) => {
  //   // Gérer les erreurs
  //   console.error(error);
  //   return false
  // });
}
function handleFailure() {
  
alert("sectionfail")  }

  function handleSuccess() {
    
      const customMsg = "payment succeeded"   
      alert(customMsg)


  }

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3 font-Inter">
      <div className="container">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 lg:col-span-6">
            <div className="pb-lg-0">
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
                <div className="flex items-center justify-between gap-5 mb-1">
                <span className="mb-0 text-xl font-bold"> {choice.title.toUpperCase()} Plan </span>
                <span className="m-4 px-4 mb-3 text-xl font-semibold">
                      {total_payable_amount} FCFA / {months==1 ? "mois" : months==3? 'trimestre':'An' } 
                    </span>
                </div>
                                <div className="grid grid-cols-12 gap-4 md:gap-3 mb-8">
                  <div className="col-span-12 md:col-span-12">
                    
                    <div className="border border-dashed my-2"></div>
                  </div>

                  {myfeatures.map((valeur: string, index: number) => (
                    <div key={index} className="col-span-12 md:col-span-12">
                      <div className="border border-neutral-40 rounded-2xl bg-[var(--bg-1)] py-1 px-4 px-xxl-8">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className="clr-neutral-400 inline-block text-sm">
                            {valeur}
                          </span>
                          <i className="text-2xl las la-edit text-primary"></i>
                        </div>
                      </div>
                    </div>
                  ))}

                  {}
                </div>
                <div>
      {/* <button onClick={handleGoBack}>Retour</button> */}
    </div>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
                <h4 className="mb-3 text-2xl font-semibold">
                  {" "}
                  Billing address{" "}
                </h4>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <p className="mb-0">
                    Transaction ID:
                    <span className="text-primary">{transaction_id}</span>
                  </p>
                  <p className="mb-0">
                    Total Payable Amount:
                    <span className="text-primary">{total_payable_amount}</span>
                  </p>
                </div>
                <div className="border border-dashed my-6"></div>
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                      placeholder="Enter Name"
                      name="customer_name"
                      value={paymentAPIdata.customer_name}
            onChange={handleInputChangep}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="email"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                      placeholder="Enter Email" name="customer_email"
                      value={paymentAPIdata.customer_email}
            onChange={handleInputChangep}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <input
                      type="text"
                      className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="rounded-lgborder bg-[var(--bg-1)] pr-4">
                      <select
                        className="w-full bg-transparent px-5 py-3 focus:outline-none"
                        aria-label="Default select example"
                      >
                        <option>Maroua</option>
                        <option value="1">Yaounde</option>
                        <option value="2">Douala</option>
                        <option value="3">Edea</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <textarea
                      rows={5}
                      className="w-full bg-[var(--bg-1)] border border-neutral-40 rounded-lg focus:outline-none py-3 px-6"
                      placeholder="Enter Address"
                    ></textarea>
                  </div>
                 
                </div>
                
                <a 
                className={`link inline-flex items-center gap-2 py-3 px-6 rounded-lg  text-white :bg-primary-400 hover:text-white font-medium w-full justify-center ${addressValidated? 'bg-neutral-700':"bg-primary"}`}

                onClick={() => {
                        validateAddress(!addressValidated);
                        toast.success('successfully validated address');

                      }} >
                        <span className="inline-block">  {addressValidated? "address validated": 'validate Address'} </span>
                      </a>
                
              
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            {/* <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
              <h4 className="mb-6 text-2xl font-semibold">
                {" "}
                Enter Promo Code{" "}
              </h4>
              <div className="p-2 rounded-full border border-neutral-40 bg-[var(--bg-2)] mb-4">
                <form action="#" className="flex items-center">
                  <input
                    type="text"
                    placeholder="Promo Code"
                    className="w-full border-0 bg-transparent text-[var(--neutral-700)] px-3 py-2 ::placeholder-neutral-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="grid place-content-center px-6 py-3 rounded-full bg-primary text-white border-0 text-sm"
                  >
                    Apply
                  </button>
                </form>
              </div>
              <span className="block text-[var(--neutral-700)]">
                {promo_discount} % Off Discount
              </span>
            </div> */}

            <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-5">
              <h4 className="mb-6 text-2xl font-semibold"> Payment methods </h4>
              <ul className="flex flex-wrap items-center gap-6">
                <li>
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 h-14 p-4 rounded-lg hover:bg-blue-700 hover:text-white border-2 border-gray-500 hover:border-blue-700 p-4 ${isActive == 0 ? "bg-blue-700 text-white": '' } `}
                      onClick={() => {
                        setIsActive(0);
                      }}
                    >
                      <Image
                        src={"/img/credit-card.png"}
                        alt="Icone"
                        width={50}
                        height={50}
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="credit-card"
                      >
                        Credit card
                      </label>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 h-14 p-4 rounded-lg hover:bg-blue-700 hover:text-white border-2 border-gray-500 hover:border-blue-700 p-4 ${isActive == 1 ? "bg-blue-700 text-white": '' } `}
                      onClick={() => {
                        setIsActive(1);
                      }}
                    >
                      <Image
                        src={"/img/debit-card.png"}
                        alt="Icone"
                        width={50}
                        height={50}
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="debit-card"
                      >
                        debit card
                      </label>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 h-14 p-4 rounded-lg hover:bg-blue-700 hover:text-white border-2 border-gray-500 hover:border-blue-700 p-4 ${isActive == 2 ? "bg-blue-700 text-white": '' } `}
                      onClick={() => {
                        setIsActive(2);
                      }}
                    >
                      <Image
                        src={"/img/paypal-transparent.png"}
                        alt="Icone"
                        width={50}
                        height={50}
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="paypal"
                      >
                        Paypal
                      </label>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 h-14 p-4 rounded-lg hover:bg-blue-700 hover:text-white border-2 border-gray-500 hover:border-blue-700 p-4 ${isActive == 3 ? "bg-blue-700 text-white": '' } `}
                      onClick={() => {
                        setIsActive(3);
                      }}
                    >
                      <Image
                        src={"/img/mobile--money.png"}
                        alt="Icone"
                        width={50}
                        height={50}
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="Mobile-Money"
                      >
                        Mobile Money
                      </label>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <button
                      className={`flex items-center gap-2 h-14 p-4 rounded-lg hover:bg-blue-700 hover:text-white border-2 border-gray-500 hover:border-blue-700 p-4 ${isActive == 4 ? "bg-blue-700 text-white": '' } `}
                      onClick={() => {
                        setIsActive(4);
                      }}
                    >
                      <Image
                        src={"/img/orange-money.png"}
                        alt="Icone"
                        width={50}
                        height={50}
                      />
                      <label
                        className="inline-block text-lg font-medium cursor-pointer"
                        htmlFor="Orange-Money"
                      >
                        Orange Money
                      </label>
                    </button>
                  </div>
                </li>
              </ul>
              <div className="border border-dashed my-6"></div>
              
                {isActive < 2 ? (
                  <>
                  <div className="grid grid-cols-12 gap-4 lg:gap-6">
                    <div className="col-span-12">
                      <label
                        htmlFor="card-number"
                        className="text-xl font-medium block mb-3"
                      >
                        Card number
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="2456 1665 5155 5151"
                        id="card-number" name="cardNumber"
                        value={formData.cardNumber}
            onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label
                        htmlFor="expiry-date"
                        className="text-xl font-medium block mb-3"
                      >
                        Expiry date
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="DD/MM/YY"
                        id="expiry-date"
                         name = "expirationDate"
                        value={formData.expirationDate}
            onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label
                        htmlFor="cvc"
                        className="text-xl font-medium block mb-3"
                      >
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="3 digits"
                        id="cvc" 
                        name="cvc"
                        value={formData.cvc}
            onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-12">
                      <label
                        htmlFor="card-name"
                        className="text-xl font-medium block mb-3"
                      >
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="Jab Archur"
                        id="card-name" 
                      />
                    </div>
                    </div>

                  </>
                ) :isActive == 2 ? (
                  <div className="col-span-12 md:col-span-12">
                      <label
                        htmlFor="paypal-email"
                        className="text-xl font-medium block mb-3"
                      >
                        Paypal email
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="enter paypal email"
                        id="paypal-email" name="paypalEmail"
                        value={formData.paypalEmail}
            onChange={handleInputChange}
                      />
                    </div>
                )
                : (
                  <div className="grid grid-cols-12 gap-4 lg:gap-6 " >
                    
                    <div className="col-span-12 md:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="text-xl font-medium block mb-3"
                      >
                        FIRST NAME
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="UBALDI"
                        id="expiry-date"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="text-xl font-medium block mb-3"
                      >
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"
                        placeholder="UBALDINI"
                        id="cvc"
                      />
                    </div>
                    <label
                    htmlFor="number"
                    className="text-xl font-medium block mb-2"
                  >
                    NUMBER
                  </label>
                    <div className="col-span-12 flex gap-3 h-70 bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-lg py-3 px-5"

                    >
                      <Image
                        src={"/img/cameroon.jpeg"}
                        alt="Icone"
                        width={30}
                        height={30}
                      />
                      <input
                      type="text"
                      placeholder="+237 699 71 87 51"
                      name="phoneNumber"
                      value={formData.phoneNumber}
            onChange={handleInputChange}
                    />
                    </div>
                    
                  </div>
                )}
                
                <a 
                className={`link inline-flex items-center gap-2 mt-2 py-3 px-6 rounded-lg  text-white :bg-primary-400 hover:text-white font-medium w-full justify-center ${credentialConfirmed? 'bg-neutral-700':"bg-primary"}`}

                onClick={() => {

                        confirmCredential(!credentialConfirmed);
                        toast.success('credentials registered');
                        

                      }} >
                        <span className="inline-block">  {credentialConfirmed? "Credentials confirmed": 'confirm credentials'} </span>
                      </a>
                
              
            </div>

            <div className="bg-white rounded-2xl p-3 mb-6 sm:p-4 lg:p-6 border">
              <h4 className="mb-0 text-2xl font-semibold">Order Summary</h4>
              <div className="border border-dashed my-8"></div>
              <ul className="gap-4">
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Subscription date</p>
                  <p className="mb-0 font-medium">{subscription_date}</p>
                </li>

                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Renewal date</p>
                  <p className="mb-0 font-medium">
                    {expiryDate.toLocaleString()}
                  </p>
                </li>
                <div className="border border-dashed my-6"></div>

                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Subtotal</p>
                  <p className="mb-0 font-medium">{subtotal} FCFA</p>
                </li>
                <div className="border border-dashed my-6"></div>

                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Service charge</p>
                  <p className="mb-0 font-medium">{service_charge} %</p>
                </li>

                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Tax</p>
                  <p className="mb-0 font-medium">{tax} %</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Promo Code</p>
                  <p className="mb-0 font-medium">{promo_discount} %</p>
                </li>
              </ul>
              <div className="border border-dashed my-8"></div>
              <div className="flex items-center justify-between flex-wrap mb-6">
                <p className="mb-0">Payable Now</p>
                <p className="mb-0 font-medium">{total_payable_amount} FCFA</p>
              </div>
              
                <a 
                className={`link inline-flex items-center gap-2 py-3 px-6 rounded-lg  text-white :bg-primary-400 hover:text-white font-medium w-full justify-center ${paymentLaunched? 'bg-neutral-700':"bg-primary"}`}
                      
                onClick={async () => {
                  if(addressValidated && credentialConfirmed){
                    const infos = getPaymentDatas()
                    const result = await proceedToPayment() && await subscribeThen()

                    result? handleSuccess() : handleFailure()
                  }
                  if(!credentialConfirmed){
                    alert("you must confirm your credentials !")
                    toast.error('you must confirm your credentials !');

                  }else{
                    if(!addressValidated){
                      alert("you must validate your address!")
                      toast.error('you must validate your address!');

                    }
                  }
                      }} >
                        <span className="inline-block">  {paymentLaunched? "payment on process ... waiting for response": 'launch payment'} </span>
                      </a>
                
              
              
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
