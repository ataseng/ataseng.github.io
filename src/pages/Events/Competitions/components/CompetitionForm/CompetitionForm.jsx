import React from 'react';
import './CompetitionForm.css';

function CompetitionForm({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="title">2. Geleneksel Algoritma Yarışması Başvuru Formu</h2>
        <form className="form">
          <input type="text" placeholder="1. Yarışmacı isim/soyisim:" className="input" />
          <input type="text" placeholder="2. Yarışmacı isim/soyisim:" className="input" />
          <input type="text" placeholder="Telefon numarası:" className="input" />
          <input type="text" placeholder="Grup ismi :" className="input" />
          <input type="email" placeholder="Email :" className="input" />
          <button type="submit" className="button">Kayıt</button>
        </form>
      </div>
    </div>
  );
}

export default CompetitionForm;
