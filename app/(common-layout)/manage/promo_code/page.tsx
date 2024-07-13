"use client"

import { Promo } from '@/datas/types';
import React, { useEffect, useState } from 'react';
import {generateOTP} from "@/components/tests/optgenerator"
import axios from 'axios';

const page = () => {
  const [promo, setPromo] = useState<Promo[]>([]);
  const [promoBd, setPromoBd] = useState<Promo[]>([]);
  const [genrable,setGenerable]= useState(false)
  const[number,setNumber]=useState(0)
  const [validate,setValid]=useState(0)
  const [discount,setDiscount]=useState(0)
  
  const handleGenerate = async(num:number,valid:number) => {
    console.log(num,valid);
    
      let promoList = [];
      for (let i = 0; i < num; i++) {
        const otp = generateOTP();
        promoList.push({
          code: otp,
          validity: valid,
          discount: 20,
          status: 'active',
          startDate:null
        });
      }
      setPromo([...promo, ...promoList])
  }

    const SendPromo=async()=>{
      console.log(promo);
      
        await axios.post("http://localhost:5000/save_promo",promo)
        .then((response)=>{
          console.log(response);
        })
        .catch((error)=>{
          console.log(error);
          
        })
    }
    
    const handlenumber=(e:any)=>{
      setNumber(e.target.value)
    }

    const handleValid=(e:any)=>{
      setValid(e.target.value)
    }

    const handleDiscount=(e:any)=>{
      setDiscount(e.target.value)
    }

    useEffect(()=>{
      if (promoBd.length>0) {
        setGenerable(true)
      }

      axios.get<Promo[]>('http://localhost:5000/get_promo')
     .then((response)=>{
        setPromoBd(response.data)
     })
     .catch((error)=>{
      console.log(error);
      
     })
    },[])

  return (
    <div className="justify-center items-center p-6">
      <div className="mx-5 p-8 mb-5 bg-[var(--primary-light)]" >
          <h1 className="text-center text-4xl text-[var(--neutral-700)] font-bold leading-tight tracking-tight font-inter">
            PROMO CODE MANAGEMENT
          </h1>
      </div>
        <div className="overflow-x-auto">
            <div className="flex items-center flex-row">
              <button
                    className="flex items-center justify-center text-xl px-4 py-4 m-3 bg-primary text-white rounded-full focus:outline-none  min-h-65"
                    onClick={()=>{handleGenerate(number,validate)}}
                  >
                    <span>generate</span>
              </button>
              <button
              className="flex items-center justify-center text-xl px-4 py-4 m-3 bg-primary text-white rounded-full focus:outline-none  min-h-65"
              onClick={SendPromo}
              >
                <span>save</span>
              </button>
              <label htmlFor="">Number of code</label>
              <input type="number" value={number} onChange={handlenumber} className='mx-3'/>
              <label htmlFor="">Validity</label>
              <input type="number" value={validate} onChange={handleValid} className='mx-3'/>
              <label htmlFor="">Discount</label>
              <input type="number" value={discount} onChange={handleDiscount} className='mx-3'/>
            </div>
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-left bg-[var(--bg-1)] border-b border-dashed flex justify-center items-center">
                <th className="py-3 lg:py-4 px-2 xl:px-4 mx-[2rem]">Code</th>
                <th className="py-3 lg:py-4 px-2 mx-[2rem]">Validity</th>
                <th className="py-3 lg:py-4 px-2 mx-[2rem]">Discount</th>
                <th className="py-3 lg:py-4 px-2 mx-[2rem]">Status</th>
                <th className="py-3 lg:py-4 px-2 mx-[2rem]">StartDate</th>
              </tr>
            </thead>
            <tbody>
              {promo.map(promo =>(
                <tr
                key={promo.code}
                className="text-left bg-[var(--bg-1)] border-b border-dashed flex justify-center items-center">
                <div className='flex justify-center items-center flex-row  '>
                  <td className="py-3 lg:py-4 px-2 text-primary mx-[2.5rem]">{promo.code}</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">
                    {promo.validity} days
                  </td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.discount} %</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.status}</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.startDate?.toLocaleDateString()}</td>
                </div>
              </tr>
                ))
              }
              {promoBd.map(promo =>(
                <tr
                key={promo.code}
                className="text-left bg-[var(--bg-1)] border-b border-dashed flex justify-center items-center">
                <div className='flex justify-center items-center flex-row  '>
                  <td className="py-3 lg:py-4 px-2 text-primary mx-[2.5rem]">{promo.code}</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">
                    {promo.validity} days
                  </td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.discount} %</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.status}</td>
                  <td className="py-3 lg:py-4 px-2 mx-[2.5rem]">{promo.startDate?.toLocaleDateString()}</td>
                </div>
              </tr>
                ))
              }
            </tbody>
          </table>
          
        </div>
    </div>
  )
}

export default page
