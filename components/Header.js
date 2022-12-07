import React, { useState, useRef } from "react";
import axios from "axios";
import Toast from "react-hot-toast";

// Import clickOutside
import useOnClickOutside from "./ClickOutside";

// Icons
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { BiSend } from "react-icons/bi";

const Header = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  useOnClickOutside(ref, () => setShow(false));

  // States for input fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const url = `${process.env.url}/api/todos`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") return;
    await axios
      .post(url, {
        title: title,
        description: description,
      })
      .then((result) => {
        console.log(result);
        setTitle("");
        setDescription("");
        Toast.success("Note added!");
      })
      .catch((err) => {
        err.response;
      });
  };

  return (
    <section className="w-full flex flex-col gap-2 justify-center items-center py-4">
      <div className="flex items-center justify-center gap-4">
        <span>
          <FaReact className=" text-3xl text" />
        </span>
        +
        <span>
          <SiMongodb className=" text-3xl text" />
        </span>
        +
        <span>
          <SiExpress className=" text-3xl text" />
        </span>
        +
        <span>
          <FaNodeJs className=" text-3xl text" />
        </span>
      </div>

      <div className="w-full flex mt-5 flex-col gap-2 justify-center items-center py-4">
        <form
          onSubmit={handleSubmit}
          className=" w-4/12 relative flex flex-col py-5 px-6 gap-3 bg-white rounded-lg shadow-md"
          ref={ref}
        >
          {show && (
            <input
              type="text"
              className="outline-none font-bold text-black"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          <textarea
            name=""
            id=""
            placeholder="Take a note"
            className="min-h-80 max-h-350 overflow-auto outline-none resize-none"
            onClick={() => setShow(true)}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="flex items-center justify-center p-5 bg-green-700 w-7 h-7 rounded-full absolute -bottom-4 right-4 text-white"
          >
            <span>
              <BiSend />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Header;
