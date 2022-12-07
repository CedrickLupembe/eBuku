import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

// Icons
import { MdOutlineEdit } from "react-icons/md";

// Modal
import Modal from "./Modal";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);

  const getAllNotes = async () => {
    const url = `${process.env.url}/api/todos`;
    await axios
      .get(url)
      .then((result) => {
        setNotes(result.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    const token = setInterval(getAllNotes, 500); // Every 2 seconds?
    getAllNotes(); // Initial request
    return () => {
      // Don't forget to cleanup the interval when this effect is cleaned up.
      clearInterval(token);
    };
  }, []);

  const handleModalUpdate = () => {
    setModal(!modal);
  };

  return (
    <section className="relative w-full p-5 mt-8 grid grid-cols-4 gap-4 auto-rows-max">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white hover:shadow-lg relative flex justify-between flex-col p-4 group rounded-lg border border-slate-300 duration-700 ease-in-out"
        >
          <div className=" w-auto">
            <h1 className="font-bold text-black">{note.title}</h1>
            <p className="mt-2 text-gray-700">{note.description}</p>
          </div>

          <p className="flex items-center justify-end text-xs text-gray-400 mt-3">
            {moment(note.CreateAt).format("llll")}
          </p>

          <span
            onClick={() => {
              {
                handleModalUpdate();
                setId(note._id);
                setTitle(note.title);
                setDescription(note.description);
              }
            }}
            className="hidden absolute top-3 group-hover:block right-3 p-2 text-gray-400 cursor-pointer duration-700 ease-in-out hover:bg-gray-200 hover:text-gray-900 rounded-full"
          >
            <MdOutlineEdit />
          </span>
        </div>
      ))}

      <Modal
        modal={modal}
        setModal={setModal}
        handleModalUpdate={handleModalUpdate}
        Title={title}
        Description={description}
        Id={id}
      />
    </section>
  );
};

export default Notes;
