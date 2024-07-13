"use client"

import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'

const page = () => {

    const [plan,setPlan]=useState("")
    const [validity,setValidity]=useState()
    const [amount,setAmount]=useState()
    const [content,setContent]=useState("")
    const [Advantage,setAdvantage]=useState("")
    // const [Advantage2,setAdvantage2]=useState("")
    // const [Advantage3,setAdvantage3]=useState("")
    const [description,setDescription]=useState<String[]>([])
    //const [BenefitForm,setBenefitForm]=useState(false)
    const [confirm,setConfirm]=useState(false)
    const [message,setMessage]=useState("")
//pour editer les plans
const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newValue, setNewValue] = useState<string>('');

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewValue(description[index]);
  };

  const handleSave = (index: number) => {
    setDescription((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = newValue;
      return updatedData;
    });
    setEditingIndex(null);
    setNewValue('');
  };
//fin pour edition des plans
    const handlePlan=(e:any)=>{
        setPlan(e.target.value)
    }

    const handleAmount=(e:any)=>{
        setAmount(e.target.value)    
    }

    const handleContent=(e:any)=>{
        setContent(e.target.value)    
    }

    const handleAdv=(e:any)=>{
        setAdvantage(e.target.value)   
    }

    const handleAdd=(e:any)=>{
        setDescription([...description, Advantage])  
    }

    // const handleAdv3=(e:any)=>{
    //     setAdvantage3(e.target.value) 
    // }

    const handleValidity=(e:any)=>{
        setValidity(e.target.value)   

    }

    const handleConfirm=()=>{
        setConfirm(true)
    }

    const handleSelection=()=>{
        console.log(description);
        
        if (confirm) {
            axios.get("http://localhost:5000/find_plan")
            .then(async(response) => {
                const results=response.data
                const resultPremium = results.filter((responseItem:any) => responseItem.title==="premium")
                const resultStandard = results.filter((responseItem:any) => responseItem.title==="standard")
                const resultBasic = results.filter((responseItem:any) => responseItem.title==="basic")
            
                if (plan==="premium") {
                    if (validity==1) {
                        const res=resultPremium.find((resItem:any) => resItem.type==="monthly")
                        const newData={
                            "type":"monthly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                    if (validity==3) {
                        const res=resultPremium.find((resItem:any) => resItem.type==="quarterly")
                        const newData={
                            "type":"quarterly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        }) 
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                    if (validity==12) {
                        const res=resultPremium.find((resItem:any) => resItem.type==="annually")
                        const newData={
                            "type":"annually",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                    
                }
                if (plan==="standard") {
                    if (validity==1) {
                        const res=resultStandard.find((resItem:any) => resItem.type==="monthly")
                        const newData={
                            "type":"monthly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                    if (validity==3) {
                        const res=resultStandard.find((resItem:any) => resItem.type==="quarterly")
                        const newData={
                            "type":"quarterly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                        
                    }
                    if (validity==12) {
                        const res=resultStandard.find((resItem:any) => resItem.type==="annually")
                        const newData={
                            "type":"annually",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                        
                    }
        
                }
                if (plan==="basic") {
                    if (validity==1) {
                        const res=resultBasic.find((resItem:any) => resItem.type==="monthly")
                        const newData={
                            "type":"monthly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                        
                    }
                    if (validity==3) {
                        const res=resultBasic.find((resItem:any) => resItem.type==="quarterly")
                        const newData={
                            "type":"quarterly",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                    if (validity==12) {
                        const res=resultBasic.find((resItem:any) => resItem.type==="annually")
                        const newData={
                            "type":"annually",
                            "title": plan,
                            "description":description,
                            "content":content,
                            "amount": amount     
                        }
                        //delete res 
                        await axios.post("http://localhost:5000/delete_plan",res)
                        .then(async(response) =>{
                            console.log(response.data);
                            await axios.post("http://localhost:5000/save_plan",newData)
                            .then(async(response) =>{
                                console.log(response.data);
                                setMessage("Saved successfully")
                            })
                            .catch((error)=>{
                                console.log(error);
                                setMessage("Failed to save")
                                
                            })
                        })
                        .catch((error)=>{
                            console.log(error);
                            
                        })
                    }
                }
            })
            .catch((err) =>{
                console.log(err);  
            })
        } else {
            alert("Please confirm your changes")
        }
    }

    useEffect(()=>{
        axios.get("http://localhost:5000/find_plan")
        .then(async(response) => {
            const results=response.data
            const resultPremium = results.filter((responseItem:any) => responseItem.title==="premium")
            const resultStandard = results.filter((responseItem:any) => responseItem.title==="standard")
            const resultBasic = results.filter((responseItem:any) => responseItem.title==="basic")
            
            if (plan==="premium") {
                if (validity==1) {
                    const res=resultPremium.find((resItem:any) => resItem.type==="monthly")
                    console.log(res);
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
                if (validity==3) {
                    const res=resultPremium.find((resItem:any) => resItem.type==="quarterly")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
                if (validity==12) {
                    const res=resultPremium.find((resItem:any) => resItem.type==="annually")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
                
            }
            if (plan==="standard") {
                if (validity==1) {
                    const res=resultStandard.find((resItem:any) => resItem.type==="monthly")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
                if (validity==3) {
                    const res=resultStandard.find((resItem:any) => resItem.type==="quarterly")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                    
                }
                if (validity==12) {
                    const res=resultStandard.find((resItem:any) => resItem.type==="annually")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                    
                }
    
            }
            if (plan==="basic") {
                if (validity==1) {
                    const res=resultBasic.find((resItem:any) => resItem.type==="monthly")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                    
                }
                if (validity==3) {
                    const res=resultBasic.find((resItem:any) => resItem.type==="quarterly")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
                if (validity==12) {
                    const res=resultBasic.find((resItem:any) => resItem.type==="annually")
                    setAmount(res.amount);
                    setContent(res.content);
                    setDescription(res.description);
                }
            }
        })
        .catch((err) =>{
            console.log(err);  
        })

    },[plan,validity])

  return (
    <div className="justify-center items-center p-6">
        <div className="mx-5 p-8 mb-5 bg-[var(--primary-light)]" >
            <h1 className="text-center text-4xl text-[var(--neutral-700)] font-bold leading-tight tracking-tight font-inter">
            PLANS MANAGEMENT
            </h1>
        </div>
        <div className="overflow-x-auto flex flex-row">
            <div className="text-left bg-[var(--bg-1)]  mx-[4rem] flex items-center">
                <label htmlFor="" className='mx-[2rem]'>Plans</label>
                <select name={"plan"} id="" className='px-4 py-2' onChange={handlePlan}>
                    <option value="">---</option>
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                    <option value="basic">Basic</option>
                </select>
            </div>
            <div className="text-left bg-[var(--bg-1)]  mx-[4rem] flex items-center">
                <label htmlFor="" className='mx-[2rem]'>Validity</label>
                <select name={"validity"} id="" className='px-4 py-2' onChange={handleValidity}>
                    <option value={0}>---</option>
                    <option value={1}>1 month</option>
                    <option value={3}>3 months</option>
                    <option value={12}>12 months</option>
                </select>
            </div>
        </div>
        <div className="text-left bg-[var(--bg-1)]  mx-[4rem] my-[2rem] flex items-center">
            <form action="">
                <div className='text-left flex items-center'>
                    <label htmlFor="">Amount</label>
                    <input type="number" name="amount" id="" className='bg-[var(--primary-light)] mx-[1rem]' placeholder='  enter the new amount' value={amount} onChange={handleAmount}/>
                </div>
                <div className='text-left flex items-center'>
                    <label htmlFor="">Content</label>
                    <input type="text" value={content} onChange={handleContent} className='bg-[var(--primary-light)] mx-[1rem] my-[1rem] w-[50rem]'/>
                </div>
                {/* <div className='text-left flex items-center'>
                    <label htmlFor="">Benefit</label>
                    <input type="text" value={Advantage1} onChange={handleAdv1} className='bg-[var(--primary-light)] mx-[1rem] my-[1rem] w-[50rem]'/>
                </div>
                <div className='text-left flex items-center'>
                    <label htmlFor="">Benefit</label>
                    <input type="text" value={Advantage2} onChange={handleAdv2} className='bg-[var(--primary-light)] mx-[1rem] my-[1rem] w-[50rem]'/>
                </div>
                <div className='text-left flex items-center'>
                    <label htmlFor="">Benefit</label>
                    <input type="text" value={Advantage3} onChange={handleAdv3} className='bg-[var(--primary-light)] mx-[1rem] my-[1rem] w-[50rem]'/>
                    <a className={`flex items-center justify-center text-m px-2 py-2 m-3 ${confirm? 'bg-neutral-700':"bg-primary"} text-white w-[10rem] focus:outline-none  min-h-65`} onClick={handleConfirm}>Confirm changes</a>
                </div> */}
                {/* <table>
                    <thead>
                        <tr>
                            <th>Benefit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {description.map((descrip) =>(
                        <div className='text-left flex items-center'>
                        <tr>
                            <input type="text" value={descrip} />
                        </tr>
                        </div>))}
                    </tbody>
                </table> */}
                  <table>
      <thead>
        <tr>
          <th>Valeur</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {description.map((item, index) => (
          <tr key={index}>
            {editingIndex === index ? (
              <td>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSave(index);
                    }
                  }}
                />
              </td>
            ) : (
              <td>{item}</td>
            )}
            <td>
              {editingIndex === index ? (
                <a onClick={() => handleSave(index)}>Enregistrer</a>
              ) : (
                <a onClick={() => handleEdit(index)}>Modifier</a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

                {
                    (
                    <div className='text-left flex items-center'>
                        <label htmlFor="">Add Benefit</label>
                        <input type="text" value={Advantage} onChange={handleAdv} className='bg-[var(--primary-light)] mx-[1rem] my-[1rem] w-[50rem]'/>
                        <a onClick={handleAdd} className="flex items-center justify-center text-sm px-2 py-2 m-3 bg-[green] text-white rounded-full focus:outline-none  min-h-65">Add</a>
                    </div>
                    )
                }
                <a className={`flex items-center justify-center text-m px-2 py-2 m-3 ${confirm? 'bg-neutral-700':"bg-primary"} text-white w-[10rem] focus:outline-none  min-h-65`} onClick={handleConfirm}>Confirm changes</a>
                <div className='text-left flex items-center'>
                    <p className='flex items-center justify-center text-[green]'>{message}</p>
                </div>
                <div className='text-left flex items-center'>
                    <input type="reset" value="Cancel" className="flex items-center justify-center text-xl px-4 py-4 m-3 bg-[red] text-white rounded-full focus:outline-none  min-h-65"/>
                    <a className="flex items-center justify-center text-xl px-4 py-4 m-3 bg-primary text-white rounded-full focus:outline-none  min-h-65" onClick={handleSelection}>Save</a>
                </div>
            </form>
        </div>
    </div>
  )
}

export default page
