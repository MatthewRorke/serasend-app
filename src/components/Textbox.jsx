import { useState } from "react";

function Textbox(props) {
  const [input, setInput] = useState("");
  const type = props.password ? "password" : "text";

  return (
    <div class='w-full px-3'>
      <label class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-first-name'>
        {props.label}
      </label>
      <input
        class='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
        id='grid-first-name'
        type={type}
        placeholder={props.placeholder}
      />
      <p class='text-red-500 text-xs italic'>{props.error}</p>
    </div>
  );
}

export default Textbox;
