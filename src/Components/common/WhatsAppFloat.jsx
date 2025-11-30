import React from 'react';
import './WhatsAppFloat.css';
import icon from '../assets/whatsap.png'

const WhatsAppFloat = () => {
  return (
    <a 
      href="https://wa.me/+573014543161" 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="WhatsApp Contact"
    >
      <img src="icon"/>
    </a>
  );
};

export default WhatsAppFloat;