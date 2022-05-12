import React, { useState } from "react";

function CommandLine({ updateShell }) {
  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const availableProducts = ["apple", "banana", "orange", "pear"];

  const availableCommands = {
    add: (targets) => {
      targets.forEach((target) => {
        if (!availableProducts.includes(target)) {
          console.log("Expected valid statements");
        } else {
          setCart([...cart, target]);
          console.log(`Added ${target} to the list`);
        }
      });
    },
    rm: (targets) => {
      targets.forEach((target) => {
        if (availableProducts.includes(target) && cart.includes(target)) {
          console.log("Expected valid statements");
        } else {
          setCart(cart.filter((product) => product !== target));
          console.log(`Removed ${target} from the list`);
        }
      });
    },
    status: () => {},
  };
  const functions = Object.keys(availableCommands);

  return (
    <div className="command-line">
      <span className="console-text">user@git--store</span>
      <span className="user-text">:</span>
      <span className="lesser-text">~</span>
      <span className="user-text">$</span>
      <span>&nbsp;</span>
      <input
        type="text"
        className="command-line__input-field user-text"
        autoFocus={true}
        onChange={handleChange}
        onKeyDown={handleCommand}
        disabled={disabled}
        value={input}
      />
    </div>
  );

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleCommand(e) {
    if (e.code === "Enter" && input !== "") {
      const commandLine = input.split(" ");
      e.target.blur();
      setDisabled(true);

      if (commandLine[0] !== "git") {
        return false;
      }
      const command = commandLine[1];
      const commandTarget = commandLine.slice(2);

      if (functions.includes(command)) {
        availableCommands[command](commandTarget);
      }
      updateShell(false);
    }
  }
}

export default CommandLine;
