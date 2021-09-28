import React from "react";
import { Modal } from "react-bootstrap";
import ChartListing, { ChartListing1 } from "./ChartListing";

class ListingModal extends React.Component {
  render() {
    const { show, handleClose, name } = this.props;
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
          {/* <ChartListing name={name} /> */}
          <ChartListing1 name={name} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default ListingModal;
