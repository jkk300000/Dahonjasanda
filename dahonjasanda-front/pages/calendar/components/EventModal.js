// EventModal.js
import React from "react";

const EventModal = ({ event, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{event.title}</h2>
        <p>Date: {event.date}</p>
        <p>Category: {event.category}</p>
        {/* 정보 URL만을 표시 */}
        <p>Info URL: {event.info}</p>
      </div>
    </div>
  );
};

export default EventModal;
