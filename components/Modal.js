import axios from "axios";
import React, { useState } from "react";
import Toast from "react-hot-toast";

// Icons
import { IoMdTrash } from "react-icons/io";

const Modal = ({
  Title,
  Description,
  modal,
  handleModalUpdate,
  Id,
  setModal,
}) => {
  const [head, setHead] = useState("");
  const [body, setBody] = useState("");
  const handleOnClose = (e) => {
    if (e.target.id === "Container") handleModalUpdate();
  };

  const url = `${process.env.url}/api/todos/${Id}`;
  // Put request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBody("");
    setHead("");

    await axios
      .put(url, {
        title: head,
        description: body,
      })
      .then((res) => {
        console.log(res.data);
        Toast.success("Note modified");
      })
      .catch((err) => {
        console.log(err);
        Toast.error("Something went wrong");
      });
  };

  // Delete request
  const deleteNote = async (e) => {
    e.preventDefault();
    await axios
      .delete(url)
      .then((res) => {
        console.log("Successfully deleted");
        Toast.success("Note deleted");
      })
      .catch((err) => {
        console.log(err);
        Toast.error("Something went wrong");
      });
  };
  return (
    <div
      id="Container"
      onClick={handleOnClose}
      className={
        modal
          ? "overflow-y-auto inset-0 flex items-center justify-center overflow-x-hidden bg-slate-700 bg-opacity-20 backdrop-blur fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full"
          : "hidden overflow-y-auto inset-0 items-center justify-center overflow-x-hidden bg-slate-700 bg-opacity-20 backdrop-blur fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full"
      }
    >
      <div className="relative p-4 w-4/12 h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div>
            <form className="w-full relative flex gap-3 flex-col pt-5 pb-2 px-6 bg-white rounded-lg shadow-md">
              <input
                className="outline-none font-bold text-black"
                placeholder={Title}
                value={head}
                onChange={(e) => setHead(e.target.value)}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={Description}
                className="min-h-150 max-h-350 overflow-auto outline-none resize-none mt-2"
              ></textarea>

              <div className="w-full flex justify-between py-2">
                <button
                  onClick={(e) => {
                    {
                      deleteNote(e), setModal(false);
                    }
                  }}
                  className="p-3 text-slate-500 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-black transition duration-700 ease-in-out"
                >
                  <IoMdTrash className="text-base" />
                </button>

                <button
                  onClick={(e) => {
                    {
                      handleSubmit(e), setModal(false);
                    }
                  }}
                  type="submit"
                  className="rounded font-bold py-0 px-5 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-black transition duration-700 ease-in-out"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
