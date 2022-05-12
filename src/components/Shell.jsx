import React, { useState } from "react";
import Modal from "react-modal";
import { IoChevronUpSharp } from "react-icons/io5";

import CommandLine from "./CommandLine";

function Shell() {
  const [newLine, setNewLine] = useState([false]);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div className="terminal-shell">
      <Modal
        className="modal"
        portalClassName="modal-portal"
        overlayClassName="overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="command-shell">
          {newLine.map((line, index) => {
            return (
              <CommandLine
                key={index}
                output={line}
                updateShell={updateShell}
              />
            );
          })}
        </div>
        <div className="footer-bar">
          <IoChevronUpSharp className="close-modal-btn" onClick={closeModal} />
        </div>
      </Modal>
      <button onClick={openModal}>open</button>
    </div>
  );

  function updateShell(output) {
    setNewLine([...newLine, output]);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
}

export default Shell;
