/* eslint-disable react/no-unescaped-entities */
"use client";
// Import Swiper styles
import PaySwitch from "@/components/PaySwitch";
import SubHeadingBtn from "@/components/SubHeadingBtn";
import { PlanData, Profile } from "@/datas/types";
//import profiles from "@/datas/profiles";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Page = ({params}: {params : {profile: number} }) => {
  const [activeButton, setActiveButton] = useState(0);
  //const profile = 1;
  const [profiles, setProfiles] = useState<Profile[]>([{
    id: 0,
    description: '',
    url : ''

}]);
  
    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/profiles');
          setProfiles(response.data);
          //console.log('all profiles : ');

          //console.log(response.data);
  
        } catch (error) {
          console.error('Erreur lors de la récupération des paiements :', error);
        }
      };
  
      fetchPayments();
    }, [profiles]);
  console.log('params.profile : '+params.profile);
  
  //const features = _features[params.profile]
  //console.log(_features[params.profile])
  const [features, setFeatures] = useState<PlanData>({
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
          const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/plans/'+params.profile);
          setFeatures(response.data);
          //console.log(response.data);
  
        } catch (error) {
          console.error('Erreur lors de la récupération des paiements :', error);
        }
      };
  
      fetchFeatures();
    }, [features, params.profile]);


const basic = features["basic"]
const standart = features["standart"]
const premium = features["premium"]
  const handleButtonClick = (index: number) => {
    setActiveButton(index);
  };

  const handleButtonActiveChange = (index: number) => {
    if (index === activeButton) {
      setActiveButton(-1);
    } else {
      setActiveButton(index);
    }
  };
//console.log('all profiles :'+JSON.stringify(profiles));
//console.log('profile 0 :'+JSON.stringify(profiles[0].url));

//console.log('all features: '+JSON.stringify(features));

const terms =profiles[params.profile-1]? profiles[params.profile-1].url.replaceAll('-',' '):'waiting...';
  return (
    <main>
      <div className="py-[5px] lg:py-[20px] bg-[var(--bg-2)] overflow-hidden px-3">
        <div className="mx-5 p-8 mb-5 bg-[var(--primary-light)]" >
          <h1 className="text-center text-4xl text-[var(--neutral-700)] font-bold leading-tight tracking-tight font-inter">
            GENERIC PLANS FOR {terms.toLocaleUpperCase()}
          </h1>
        </div>
        <div className="max-w-[570px] mx-auto flex flex-col items-center text-center">
          <SubHeadingBtn
            text="Pricing Plan"
            classes="bg-[var(--primary-light)]"
          />
          <h2 className="h2 mt-3">Choose Our Pricing Plan</h2>
          <p className="text-neutral-600 pt-5 pb-8 lg:pb-14">
            Here you have our differents pricing plan
            choose the option that fits you the most... 
            Feel free and explore the terms
          </p>
        </div>
        <div className="mb-10">
          <div className="container">
            <div className="row">
              <div className="col-span-12">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-4">
                    
      <div className="flex bg-[var(--primary-light)] rounded">
      <PaySwitch
        label='monthly'
        onClick={() => handleButtonClick(1)}
        isActive={activeButton === 1}
      />
      <PaySwitch
        label="Quarterly"
        onClick={() => handleButtonClick(3)}
        isActive={activeButton === 3}
      />
      
      <PaySwitch
        label="annually"
        onClick={() => handleButtonClick(12)}
        isActive={activeButton === 12}
      />
       </div>

                  
                 

                  </div> 
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-cols-12 g-3 md:gap-0 overflow-hidden">
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-3 h-full">
              <div className="bg-white p-6 h-full">
                <div className="text-center">
                 
                  <p className="mb-0 text-2xl font-medium text-primary">
                    Basic
                  </p>
                  <div className="border border-dashed mt-8 mb-4"></div>
                  <h1 className="h2 clr-primary-400 mb-2 text-xl"> { 2500*activeButton} FCFA / {activeButton} month </h1>
                  <p className="m-1" >
                  {basic.content}                  
                   </p>
                  <div className="border border-dashed mt-4 mb-8"></div>
                  <ul className="flex flex-col gap-4 max-text-30 mx-auto mb-8">
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start">
                      {basic.description[0]}
                      </p>
                    </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start"> {basic.description[1]}</p>
                    </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start">
                      {basic.description[2]}
                      </p>
                    </li>
                    
                  </ul>
                  <Link href={"/payment-method/" + params.profile + "/basic/" + activeButton} className="w-full rounded-lg btn-outline bg-primary hover:text-xl text-white :bg-primary-400 justify-center  font-semibold">
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-3 h-full">
              <div className="bg-primary p-6 h-full">
                <div className="text-center">
                 
                  <p className="mb-0 text-2xl font-medium text-white">
                    Standard
                  </p>
                  <div className="border border-dashed mt-8 mb-4"></div>
                  <h1 className="h2 text-white mb-2 text-xl">{ 5000*activeButton} FCFA / {activeButton} month </h1>
                  <p className="m-1 text-white">
                  {standart.content}                    </p>
                  <div className="border border-dashed mt-4 mb-8"></div>
                  <ul className="flex flex-col gap-4 max-text-30 mx-auto mb-8">
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-white"></i>
                      <p className="mb-0 text-lg text-white text-start">
                      {standart.description[0]}                      </p>
                    </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-white"></i>
                      <p className="mb-0 text-lg text-white text-start">
                      {standart.description[1]}   
                      </p>
                    </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-white"></i>
                      <p className="mb-0 text-lg text-white text-start">
                      {standart.description[2]}   
                                            </p>
                    </li>
                    
                  </ul>
                  <Link href={"/payment-method/" + params.profile + "/standart/" + activeButton} className="btn-outline  bg-white hover:bg-white hover:text-xl hover:text-primary text-primary w-full rounded-lg justify-center">
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 m-3 h-full">
              <div className="p-6 bg-white h-full" >
                <div className="text-center text-black relative" >
                 
                  <p className="mb-0 text-2xl font-medium ">
                    Premium
                  </p>
                  <div className="border border-dashed mt-8 mb-4"></div>
                  <h1 className="h2  mb-2 text-xl"> { 10000*activeButton} FCFA / {activeButton} month </h1>
                  <p className="m-1">
                  {premium.content}   
                  </p>
                  <div className="border border-dashed mt-4 mb-8"></div>
                  <ul className="flex flex-col gap-4 max-text-30 mx-auto mb-8">
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start">
                      {premium.description[0]}                        </p>
                    </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start">
                      {premium.description[1]}   
                       </p>
                                          </li>
                    <li className="flex items-center text-2xl gap-2">
                      <i className="las la-check-circle text-primary"></i>
                      <p className="mb-0 text-lg text-start">
                      {premium.description[0]}    
                                           </p>
                    </li>
                    
                  </ul>
                  <Link href={"/payment-method/" + params.profile + "/premium/" + activeButton} className="btn-outline bg-primary hover:text-xl  font-semibold text-white w-full rounded-lg justify-center  bottom-10">
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[60px] lg:pt-[120px]">
          <div className="container">
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <div className="xl:flex xl:items-center gap-xl-6">
                  <h5 className="mb-0 flex items-center gap-3 shrink-0">
                    Meet Our Valued Partner
                    <ArrowRightIcon className="w-5 h-5" />
                  </h5>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Page;
