"use client"

import DropDownButton from '@/components/tests/administratorCards'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="justify-center items-center p-6">
        <div className="mx-5 p-8 mb-5 bg-[var(--primary-light)]" >
          <h1 className="text-center text-4xl text-[var(--neutral-700)] font-bold leading-tight tracking-tight font-inter">
            ADMINISTRATION
          </h1>
        </div>
        <div className="justify-center items-center flex-row flex">
            <div className="m-4 justify-center items-center w-1/4 flex-row flex">
            <DropDownButton label="Manage Plans"  >
                <div className="p-4 relative">
                    <p className="w-full min-h-[200px] m-4 p-4 bg-primary-light text-xl">
                    In this section you can modify the informations on the plans as you wish
                    </p>
                    <Link href={"/manage/plans"} className="rounded-full  m-4 p-4 border-2 border-primary hover:bg-primary hover:text-white"> Explore...                <i className="las la-long-arrow-alt-right text-xl"></i>
                    </Link>
                </div>
            </DropDownButton>
            </div>
            <div className="m-4 justify-center items-center w-1/4 flex-row flex">
                <DropDownButton label="Manage Promo Code"  >
                    <div className="p-4 relative">
                        <p className="w-full min-h-[200px] m-4 p-4 bg-primary-light text-xl">
                        In this section you can generate new promo code, see all used promo code etc..
                        </p>
                        <Link href={"/manage/promo_code"} className="rounded-full  m-4 p-4 border-2 border-primary hover:bg-primary hover:text-white"> Explore...                <i className="las la-long-arrow-alt-right text-xl"></i>
                        </Link>
                    </div>
                </DropDownButton>
            </div>
        </div>

    </div>
  )
}

export default page
