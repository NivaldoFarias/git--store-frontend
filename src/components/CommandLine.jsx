import React, { useState } from "react";

function CommandLine(props) {
  const { updateShell, availableCommands, output } = props;
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const functions = Object.keys(availableCommands);

  function buildCommandLine() {
    return (
      <>
        <span className="console-text">user@git--store</span>
        <span className="user-text">:</span>
        <span className="lesser-text">~</span>
        <span className="user-text">$</span>
        <span>&nbsp;</span>
        <input
          type="text"
          className="command-line__input-field user-text"
          autoFocus={true}
          maxLength={24}
          onChange={handleChange}
          onKeyDown={handleCommand}
          disabled={disabled}
          value={input}
        />
      </>
    );

    function handleChange(e) {
      setInput(e.target.value);
    }

    function handleCommand(e) {
      if (e.code === "Enter" && input !== "") {
        const commandLine = input.split(" ");
        e.target.blur();
        setDisabled(true);
        if (commandLine[0] === "git") {
          const command = commandLine[1];
          const commandTargets = commandLine.slice(2);

          if (functions.includes(command)) {
            const targets = commandTargets.filter(
              (target, index, self) => self.indexOf(target) === index
            );
            availableCommands[command](targets);
          }
          updateShell("user");
        } else {
          console.log(`Unknown command`);
          updateShell("alert");
        }
      }
    }
  }

  const commandLine = buildCommandLine();

  return (
    <>
      {output === "alert" ? (
        <div className="command-line">
          <span className="lesser-text">Command not found</span>
        </div>
      ) : null}
      <div className="command-line">{commandLine}</div>
    </>
  );
}

export default CommandLine;
