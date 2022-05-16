import React, { useContext, useState, useEffect, useRef } from 'react';
import CartContext from './../hooks/CartContext';

function CommandLine(props) {
  const { updateShell, availableCommands, output } = props;
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const functions = Object.keys(availableCommands);
  const inputElement = useRef(null);

  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (output === 'clear') {
      setInput('');
      setDisabled(false);
    } else if (output === 'status') {
      setInput('');
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
      {commands()}
      <div className="command-line">{commandLine}</div>
    </>
  );

  function commands() {
    if (output === 'unknown') {
      return (
        <div className="command-line">
          <span className="lesser-text">Command not found</span>
        </div>
      );
    } else if (output === 'status') {
      return (
        <>
          {cart.length > 0 ? (
            cart.map((item, index) => {
              return (
                <div key={index} className="command-line">
                  <span className="lesser-text">
                    &nbsp;{item.title} ({item.volume})
                  </span>
                </div>
              );
            })
          ) : (
            <div className="command-line">
              <span className="lesser-text">&nbsp;Your cart is empty</span>
            </div>
          )}
        </>
      );
    } else if (output === 'help') {
      return (
        <>
          <div className="command-line">
            <span className="lesser-text">&nbsp;add (id) - add a product</span>
          </div>
          <div className="command-line">
            <span className="lesser-text">
              &nbsp;rm (id) - remove a product
            </span>
          </div>
          <div className="command-line">
            <span className="lesser-text">&nbsp;status - log cart</span>
          </div>
          <div className="command-line">
            <span className="lesser-text">&nbsp;commit - finish purchase</span>
          </div>
        </>
      );
    } else return null;
  }
}

export default CommandLine;
