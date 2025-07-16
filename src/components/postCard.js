// src/components/PostCard.js
import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  minHeight: "500px",
  margin: "20px auto",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));
const PostImage = styled("img")({
    width: "100%",
    height: "auto",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    objectFit: "cover",
    maxHeight: "300px",
  });

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const openPostDetail = () => {
    navigate(`/post/${post._id}`);
  };
 

  return (
    <StyledCard onClick={openPostDetail} sx={{cursor : 'pointer'}}>
      {post.imageUrl && <PostImage src={post.imageUrl} alt={post.title} />}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Author: {post.authorName || "Unknown"}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
