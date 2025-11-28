import React from 'react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  return (
    <a 
      href="https://wa.me/+573014543161" 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="WhatsApp Contact"
    >
      <img src="/images/whatsapicon.png" alt="WhatsApp" />
    </a>
  );
};

export default WhatsAppFloat;