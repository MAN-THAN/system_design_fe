import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

// You can move this to a separate file if needed
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const AddPost = ({ openAddModal, setOpenAddModal, handleAddPost }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const handleeAddPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Title and Content are required!");
      return;
    }
    handleAddPost(newPost);
    setNewPost({ title: "", content: "" });
    setOpenAddModal(false);
  };

  return (
    <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Add New Post
        </Typography>
        <TextField label="Title" fullWidth sx={{ mb: 2 }} value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <Button variant="contained" onClick={handleeAddPost}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddPost;
