import React, { useContext, useState } from 'react';
import { IoChevronUpSharp } from 'react-icons/io5';

import CartContext from './../hooks/CartContext';
import CommandLine from './CommandLine';

function Shell({ closeModal }) {
  const [lineType, setLineType] = useState(['user']);
  const { cart, setCart } = useContext(CartContext);

  function buildShell() {
    const availableProducts = ['apple', 'banana', 'orange', 'pear'];
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
          <IoChevronUpSharp className="close-modal-btn" onClick={closeModal} />
        </div>
      </>
    );

    function updateShell(type) {
      if (type === 'clear') {
        setLineType(['clear']);
      } else {
        setLineType((prevState) => [...prevState, type]);
      }
    }
  }

  const shell = buildShell();

  return <div className="shell">{shell}</div>;
}

export default Shell;
