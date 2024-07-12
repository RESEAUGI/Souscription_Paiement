// pages/index.tsx
"use client"
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from 'react';
interface FormData {
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <div>
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setShowModal(true)}
      >
        Créer
      </button>
      <div>
        <span><label htmlFor="name">name ::  </label> {formData.name} </span>
        <span><label htmlFor="email">email ::  </label> {formData.email} </span>
      </div>
      
 
      {/* <PopUpPay open={true} onClose={function (): void {
       } } width={"400"} height={"200"} position={"top-center"}> <p>jus a test</p> </PopUpPay> */}
        </div>
      

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md px-6 py-8">
              <h2 className="text-2xl font-bold mb-4">Formulaire</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                  >
                    Nom
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Entrez votre nom"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Entrez votre email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Soumettre
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <div >
      <Dialog open={open} size="xs" className="w-[500px]" handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          Are you sure this is exactly what you want?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
      
    </div>
  );
};

export default Home;