/* eslint-disable react/no-unescaped-entities */
"use client";
import DropDownButton from "@/components/tests/DropDownButton";
import Link from "next/link";

import profiles from "@/datas/profiles";
// Import Swiper styles
import SubHeadingBtn from "@/components/SubHeadingBtn";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MyPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
 const myprofiles = profiles
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="justify-center items-center p-6">
      <h2 className="h2 mt-4 mb-8 w-full p-5 flex items-center justify-center leading-snug">
              HERE ARE POSSIBLE PROFILES
            </h2>
      <SubHeadingBtn text="All Profiles" classes="bg-white" />
            <h2 className="h2 mt-4 mb-8 max-w-[600px] leading-snug">
              Select Your Profile 
            </h2>
      {/* <button
        className="p-2 bg-primary text-white rounded-lg m-4 w-full"
        onClick={handleOpenPopup}
      >
        Appuyez pour afficher la fenêtre pop-up
      </button>

      <Popup open={isPopupOpen} onClose={handleClosePopup} width="800px" height="600px" position="top-left" /> */}
      <div className="gap-8">
      {myprofiles.map(
        (profile)=>(
          <div className="m-4"  key = {profile.id}>
            <DropDownButton label={profile.url.replaceAll('-', ' ').toUpperCase()}  >
        <div className="p-4 relative">
          <p className="w-full min-h-[200px] m-4 p-4 bg-primary-light text-xl">
          {profile.description}
          </p>
          <Link href={"/pricing-plan/"+ profile.id } className="rounded-full  m-4 p-4 border-2 border-primary hover:bg-primary hover:text-white"> Explore...</Link>
        </div>
      </DropDownButton>
          </div>
          
        )
      )  }
      </div>
      
      
      
    </div>
  );
}
