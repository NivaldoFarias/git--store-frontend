import React, { useState } from "react";

function Shell() {
  const [input, setInput] = useState("");
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
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleCommand}
        name=""
        id=""
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
      if (commandLine[0] !== "git") {
        return setInput("");
      }
      const command = commandLine[1];
      const commandTarget = commandLine.slice(2);

      if (functions.includes(command)) {
        availableCommands[command](commandTarget);
      }
      setInput("");
    }
  }
}

export default Shell;
