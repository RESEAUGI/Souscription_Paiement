/* eslint-disable react/no-unescaped-entities */
"use client";
import DropDownButton from "@/components/tests/DropDownButton";
import { useRouter } from 'next/navigation';

// Import Swiper styles
import SubHeadingBtn from "@/components/SubHeadingBtn";
import Alert from "@/components/usefull/Alert";
import { Profile } from "@/datas/types";
import { Button, Card, CardBody, CardFooter, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MyPage() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const toogleOpenModifyDialog = () => {setOpenModifyDialog(!openModifyDialog);};

  const [selected, setSelected] = useState(0)
 const router  =  useRouter()
  const handleOpenCreateDialog = () => setOpenCreateDialog(!openCreateDialog);
  const toogleOpenModifyForm = () => {setOpenModifyForm(!openModifyForm);};

  const [myprofiles, setProfiles] = useState<Profile[]>([]);
  
    useEffect(() => {
      const fetchPayments = async () => {
        try {
          const response = await axios.get<any, AxiosResponse<any>>('http://localhost:4000/profiles');
          setProfiles(response.data);
          console.log(response.data);
  
        } catch (error) {
          console.error('Erreur lors de la récupération des paiements :', error);
        }
      };
  
      fetchPayments();
    }, [myprofiles]);
 ;  const [currentId, setId] = useState(-1);

 const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFormError, setCreateFormError] = useState('');
  const [createFormSuccess, setCreateFormSuccess] = useState('');

  const [title, setTitle] = useState('');  const [statut, setStatut] = useState('');

  const [description, setDescription] = useState('');
  const handleCancelCreate = () => {
    setIsCreateModalOpen(false);
    setDescription(''); setTitle('')
  };
  const handleCreateConfirm = async () => {
    //event.preventDefault();
    try {
      await axios.post('http://localhost:4000/profile/add',{url:title, description:description});
      console.log();
      handleOpenCreateDialog()
      setIsCreateModalOpen(false);    setDescription(''); setTitle('')

      setCreateFormSuccess('profile créé avec succès');
    } catch (error) {
      setCreateFormError('Une erreur est survenue lors de la création de la ressource');
    }
  };


 const submitProfileModify  = async ()=>{
  try {
    await axios.post('http://localhost:4000/profile/modify',{url:title, description:description, id:selected});
    console.log();
    toogleOpenModifyForm()
    setIsCreateModalOpen(false);    setDescription(''); setTitle('')

    setCreateFormSuccess('profile modifié avec succès');
  } catch (error) {
    setCreateFormError('Une erreur est survenue lors de la modification de la ressource');
  }
 }
 const handleProfileCreate  = ()=>{


 }
 const handleProfileActive  = async ()=>{
 try {
    await axios.post('http://localhost:4000/profile/modify',{statut:statut, id:selected});
    console.log();
    toogleOpenModifyForm()
    setIsCreateModalOpen(false);    setDescription(''); setTitle('')

    setCreateFormSuccess('profile modifié avec succès');
  } catch (error) {
    setCreateFormError('Une erreur est survenue lors de la modification de la ressource');
  }
 

 }
 const handleProfileDelete  = (id:number)=>{


 }
 const handleProfilePreview  = (id:number)=>{


 }

  return (
    <div className="justify-center items-center p-6">
      <div className="mx-5 p-8 mb-5 bg-[var(--primary-light)]" >
          <h1 className="text-center text-4xl text-[var(--neutral-700)] font-bold leading-tight tracking-tight font-inter ">
            ALL PROFILES
          </h1>
        </div>
        
        <div className="flex  justify-center items-center p-6">
        <SubHeadingBtn text="choose a profile to edit" classes="bg-white" />
        </div>
        {createFormError && (
              <Alert type="error">
            <i className="text-2xl las la-times-circle text-red-400 mx-3"></i>
            <h3>Erreur</h3>
                <p>{createFormError}</p>
              </Alert>
            )}
            {createFormSuccess && (
              <Alert type="success">
            <i className="text-2xl las la-check-circle text-green-400 mx-3"></i>
            <h3>Succès</h3>
                <p>{createFormSuccess}</p>
              </Alert>
            )}
        <div className="flex flex-wrap justify-center gap-4"  >

        <button  onClick={ ()=>{
setIsCreateModalOpen(true)
} } className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"> 
            create a new profile
            <i className="text-2xl las la-plus text-white mx-3"></i>
            </button>

        </div>
        <Dialog
        size="xs"
        open={openModifyForm}
        handler={toogleOpenModifyForm}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Modify  profile {/*myprofiles.find( (profile:Profile)=>profile.id === selected)?.id*/}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter the modifications
            </Typography>
            <Typography className="-mb-2" variant="h6">
              the title
            </Typography>
            <Input label={''/*myprofiles.find( (profile:Profile)=>profile.id === selected)?.url*/} color="blue" size="lg" />
            <Typography className="-mb-2" variant="h6">
              profile description
            </Typography>
            <Input label={''/*myprofiles.find( (profile:Profile)=>profile.id === selected)?.description*/} size="lg" />
            
          </CardBody>
          <CardFooter className="pt-0">
          <Button
            variant="text"
            color="red"
            onClick={toogleOpenModifyForm}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
            <Button variant="gradient" onClick={toogleOpenModifyDialog} fullWidth>
              submit
            </Button>
            
          </CardFooter>
        </Card>
        <Dialog open={openModifyDialog} size="xs" className="w-[500px]" handler={toogleOpenModifyDialog}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          Are you sure this is exactly what you want?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toogleOpenModifyDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" type="submit"  onClick={submitProfileModify} >
            <span>Confirm </span>
          </Button>
         
        </DialogFooter>
      </Dialog>
      </Dialog>
      {/* <button
        className="p-2 bg-primary text-white rounded-lg m-4 w-full"
        onClick={handleOpenPopup}
      >
        Appuyez pour afficher la fenêtre pop-up
      </button>

      <Popup open={isPopupOpen} onClose={handleClosePopup} width="800px" height="600px" position="top-left" /> */}
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-wrap justify-center gap-4"  >
        <button onClick={ handleProfileCreate} className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">
            create a new profile
            <i className="text-2xl las la-plus text-white mx-3"></i>
            </button>
        </div>
      {myprofiles.map(
        (profile)=>(
          <div className="m-4 justify-center w-1/4"  key = {profile.id}>
            <DropDownButton label={profile.url.replaceAll('-', ' ')}  >
        <div className="p-4 relative">
          <p className="w-full min-h-[200px] m-4 p-4 bg-primary-light text-xl">
          {profile.description}
          </p>
          <span className="flex flex-wrap justify-center gap-4">
          <Button onClick={ ()=>{
            setSelected(profile.id)
            toogleOpenModifyForm()
} } className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
            modify
            <i className="text-2xl las la-edit text-white mx-3"></i>
            </Button>
          {/* <button onClick={ ()=>{
handleProfileModify(profile.id)
} } className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
            modify
            <i className="text-2xl las la-edit text-white mx-3"></i>
            </button> */}
            <button onClick={ ()=>{
handleProfileDelete(profile.id)
} } className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4">
            delete
            <i className="text-2xl las la-trash-alt text-white mx-3"></i>
            </button>
            <button onClick={ ()=>{
setSelected(profile.id)
} } className={ "" + profile.statut=='inactive'? "text-white font-bold py-2 px-4 rounded mb-4 bg-green-800 hover:bg-green-600":"text-white font-bold py-2 px-4 rounded mb-4 bg-yellow-500 hover:bg-yellow-300"}>
            {profile.statut=='active'? 'disable': 'enable'}
            {profile.statut=='inactive'&&(<i className="text-2xl las la-check-circle text-white mx-3"></i>)}
            {profile.statut=='active'&&(<i className="text-2xl las la-eye-slash text-white mx-3"></i>)}
            </button>
            <button onClick={ ()=>{
handleProfilePreview(profile.id)
} } className="bg-yellow-800 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4">
            preview
            <i className="text-2xl las la-eye text-white mx-3"></i>

            </button>
            <button onClick={ ()=>{
handleProfilePreview(profile.id)
} } className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4">
            Manage Plans
            <i className="text-2xl las la-compass text-white mx-3"></i>
            <i className="text-2xl las la-times text-white mx-3"></i>
            <i className="text-2xl las la-pen-square text-white mx-3"></i>

            </button>
          </span>
          
        </div>
      </DropDownButton>
          </div>
          
        )
      )  }
      </div>
      
      
      <div className="flex flex-wrap justify-center gap-4"  >
        <button onClick={ ()=>{
setIsCreateModalOpen(true)
} } className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4">
            create a new profile
            <i className="text-2xl las la-plus text-white mx-3"></i>
            <i className="text-2xl las la-puzzle-piece text-white mx-3"></i>
            <i className="text-2xl las la-times-circle text-white mx-3"></i>

            </button>
        </div>
        {/* <PopUpPay><p>jus a test</p></PopUpPay> */}

        ({isCreateModalOpen&&(
//           <PopUpPay open={true} onClose={function (): void {
// setIsCreateModalOpen(false)        } } width={"400"} height={"200"} position={"top-center"}>
<div>
  <div className="relative inset-0 z-50 overflow-y-auto flex items-center justify-center"><form onSubmit={handleCreateConfirm}>
  
  <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="Entrez votre nom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Entrez la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
        {/* <button  className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline" type="submit">
            confirm
            

            </button> */}
            <Button onClick={handleOpenCreateDialog}  className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline" variant="gradient">
        submit
      </Button>
      <div >
      <Dialog open={openCreateDialog} size="xs" className="w-[500px]" handler={handleOpenCreateDialog}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          Are you sure this is exactly what you want?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenCreateDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" type="submit"  onClick={handleCreateConfirm} >
            <span>Confirm </span>
          </Button>
         
        </DialogFooter>
      </Dialog>
      </div>
            <button onClick={ ()=>{
              setTitle('')
              setDescription('')
              handleCancelCreate()
} } className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-4">
            cancel
            

            </button>
        </div>
          </form>
          

          </div>
          
          </div>
// </PopUpPay>
        )})
        {/* dialogs */}
       
    </div>
  );
}
