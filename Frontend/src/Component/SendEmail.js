import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SendEmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fmstmk8', 'template_i3opwlp', form.current, 'FKWFlB9oD77g5Y6Ps')
    .then(
        (result) => {
          console.log(result.text);
          alert("SUCCESS!");
        },
        (error) => {
          console.log(error.text);
          alert("FAILED...", error);
        });
  };

  const location = useLocation()
  console.log("Location state", location.state);

  const [Name, setName] = useState('')
  const [Age, setAge] = useState('')
  const [DepressionLevel, setDepressionLevel] = useState('')
  const [DepressionStatus, setDepressionStatus] = useState('')

  useEffect(() => {
    setName(location.state.Name);
    setAge(location.state.Age);
    setDepressionLevel(location.state.DepressionLevel);
    setDepressionStatus(location.state.DepressionStatus);
  }, [location])

  return (
    <form ref={form} onSubmit={sendEmail}>

        <label className="text-2xl font-bold pd-t-[20px]" >Email: </label> <br/>
        <input className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full" type="email" name="to_email" />
        <br/>
        <label className="text-2xl font-bold pd-t-[20px]" >PhoneNo (Optional): </label> <br/>
        <input className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full" type="phone" name="PhoneNo." />
      
        <input type="text" name="Name" value={Name} hidden readOnly/>
        <input type="text" name="Age" value={Age} hidden readOnly/>
        <input name="DepressionLevel" value={DepressionLevel} hidden readOnly/>
        <input name="DepressionStatus" value={DepressionStatus} hidden readOnly/>
        <br/>
        <button type="submit" value="Send" className="w-52 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500" > Send </button>

    </form>
  );
};

export default SendEmail;