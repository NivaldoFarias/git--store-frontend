import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { IoChevronUpSharp } from "react-icons/io5";

import CartContext from "./../hooks/CartContext";

import CommandLine from "./CommandLine";

function Shell() {
  const [lineType, setLineType] = useState(["user"]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  function buildShell() {
    const availableProducts = ["apple", "banana", "orange", "pear"];
    const availableCommands = {
      add: (targets) => {
        for (const target of targets) {
          if (validTarget(target)) continue;

          setCart((prevState) => [...prevState, target]);
          console.log(`Added ${target} to cart`);
        }
        function validTarget(target) {
          return !availableProducts.includes(target) || cart.includes(target);
        }
      },
      rm: (targets) => {
        for (const target of targets) {
          if (!cart.includes(target)) continue;

          setCart((prevState) => prevState.filter((item) => item !== target));
          console.log(`Removed ${target} from the list`);
        }
      },
      status: () => {},
    };

    return (
      <>
        <Modal
          className="modal"
          portalClassName="modal-portal"
          overlayClassName="overlay"
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <div className="command-shell">
            {lineType.map((type, index) => {
              return (
                <CommandLine
                  key={index}
                  updateShell={updateShell}
                  output={type}
                  availableCommands={availableCommands}
                />
              );
            })}
          </div>
          <div className="footer-bar">
            <IoChevronUpSharp
              className="close-modal-btn"
              onClick={closeModal}
            />
          </div>
        </Modal>
        <button onClick={openModal}>open</button>
      </>
    );

    function updateShell(type) {
      if (type === "clear") {
        setLineType(["clear"]);
      } else {
        setLineType((prevState) => [...prevState, type]);
      }
    }

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }
  }

  const shell = buildShell();

  return <div className="terminal-shell">{shell}</div>;
}

export default Shell;
