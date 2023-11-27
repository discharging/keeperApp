import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
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

function UpdateArea(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [note, setNote] = useState({
    id: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    setInitalState();
  }, []);
  function setInitalState() {
    setNote({
      id: props.id,
      title: props.title,
      content: props.content,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://keeperappapi-production.up.railway.app/update/${note.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      props.onAdd();
      setNote({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      props.close(false);
    }
  }

  return (
    <div>
      <form className="create-note">
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
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={3}
        />
        <Zoom in={true}>
          <Fab onClick={submitNote} disabled={isSubmitting}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default UpdateArea;
