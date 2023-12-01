import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { Audio } from "react-loader-spinner";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [notes, setNotes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addNote() {
    fetchData();
  }

  async function deleteNote(id) {
    const token = JSON.parse(localStorage.getItem("token")).token;
    if (id === undefined) {
      return;
    }
    try {
      await fetch(`http://localhost:3001/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  // Function to fetch data from MongoDB via your backend API
  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("token")).token;
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:3001/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setNotes(jsonData.notes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {isSubmitting && (
        <Modal
          open={isSubmitting}
          onClose={isSubmitting}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="three-dots-loading"
              wrapperStyle
              wrapperClass
            />
          </Box>
        </Modal>
      )}
      <div className="notes">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onAdd={addNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
export default Home;
