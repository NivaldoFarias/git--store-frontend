import React, { useState, useEffect, useRef } from 'react';

function CommandLine(props) {
  const { updateShell, availableCommands, output } = props;
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const functions = Object.keys(availableCommands);
  const inputElement = useRef(null);

  useEffect(() => {
    if (output === 'clear') {
      setInput('');
      setDisabled(false);
    }
  }, [output]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

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
          ref={(inputElement) => {
            // constructs a new function on each render
            if (inputElement) {
              inputElement.focus();
            }
          }}
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
      if (e.code === 'Enter' && input !== '') {
        const commandLine = input.split(' ');
        e.target.blur();

        if (commandLine[0] === 'git') {
          const command = commandLine[1];
          const commandTargets = commandLine.slice(2);

          if (functions.includes(command)) {
            availableCommands[command](commandTargets);
          }
          updateShell('user');
        } else if (commandLine[0] === 'clear') {
          updateShell('clear');
        } else {
          console.log(`Unknown command`);
          updateShell('unknown');
        }
      }
    }
  }

  const commandLine = buildCommandLine();

  return (
    <>
      {output === 'unknown' ? (
        <div className="command-line">
          <span className="lesser-text">Command not found</span>
        </div>
      ) : null}
      <div className="command-line">{commandLine}</div>
    </>
  );
}

export default CommandLine;
