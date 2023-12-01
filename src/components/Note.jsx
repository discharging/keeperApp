import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Modal } from "@mui/material";
import UpdateArea from "./UpdateArea";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function Note(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setIsOpen] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div
      className="note"
      onMouseOver={() => setIsHovered(true)}
      onFocus={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Box
        sx={{
          display: isHovered ? "flex" : "none",
          position: "absolute",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={() => setIsOpen(true)}>
          <EditIcon />
        </button>
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
        <Modal
          open={open}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <UpdateArea
              id={props.id}
              title={props.title}
              content={props.content}
              close={setIsOpen}
              onAdd={props.onAdd}
            />
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default Note;
