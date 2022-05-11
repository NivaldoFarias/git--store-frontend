import React, { useState } from "react";
import Modal from "react-modal";
import { IoChevronUpSharp } from "react-icons/io5";

function Shell() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("user@git--store ");
  const [cart, setCart] = useState([]);
  const availableProducts = ["apple", "banana", "orange", "pear"];

  const availableCommands = {
    add: (targets) => {
      targets.forEach((target) => {
        if (!availableProducts.includes(target)) {
          console.log("Product not available");
        }
        setCart([...cart, target]);
        console.log(`Added ${target} to the list`);
      });
    },
    rm: (targets) => {
      targets.forEach((target) => {
        if (availableProducts.includes(target) && cart.includes(target)) {
          console.log("Product not available");
        }
        setCart(cart.filter((product) => product !== target));
        console.log(`Removed ${target} from the list`);
      });
    },
  };
  const functions = Object.keys(availableCommands);

  return (
    <div className="shell">
      <Modal
        className="modal"
        portalClassName="modal-portal"
        overlayClassName="overlay"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <textarea
          type="text"
          onChange={handleChange}
          onKeyDown={handleCommand}
          className="command-shell"
          value={input}
        />
        <div className="footer-bar">
          <IoChevronUpSharp className="close-modal-btn" onClick={closeModal} />
        </div>
      </Modal>
      <button onClick={openModal}>open</button>
    </div>
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleCommand(e) {
    if (e.code === "Enter" && input !== "") {
      const commandLine = input.split(" ");
      if (commandLine[0] !== "git") {
        return setInput("");
      }
      const command = commandLine[1];
      const commandTarget = commandLine.slice(2);

      if (functions.includes(command)) {
        availableCommands[command](commandTarget);
      }
      setInput("user@git--store ");
    }
  }
}

export default Shell;
