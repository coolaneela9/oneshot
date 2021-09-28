import React from "react";
import { Modal } from "react-bootstrap";
import ChartListing from "./ChartListing";

export const ListingModal = ({ show, handleClose, name }) => {
  return (
    <Modal show={show} className="listing-modal">
      <Modal.Body>
        <div className="pull-right">
          <button
            className="close-btn pull-right"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
            role="button"
          >
            <span className="icon-cross" />
          </button>
        </div>
        <ChartListing name={name} />
      </Modal.Body>
    </Modal>
  );
};

export default ListingModal;
