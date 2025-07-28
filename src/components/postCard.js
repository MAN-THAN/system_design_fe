import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  margin: "20px auto",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}));

const PostImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  maxHeight: "500px",
});

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const avatarChar = post.authorName ? post.authorName[0].toUpperCase() : "?";

  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState(post.comments || []);
  const [newComment, setNewComment] = React.useState("");

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleAddComment = (e) => {console.log(e)
    if (!newComment.trim()) return;

    const commentToAdd = {
      id: Date.now(),
      name: "You",
      text: newComment.trim(),
    };

    setComments((prev) => [...prev, commentToAdd]);
    setNewComment("");
  };

  const openPostDetail = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <StyledCard>
      {/* Header */}
      <CardHeader
        avatar={<Avatar>{avatarChar}</Avatar>}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={post.authorName || "Unknown"}
        subheader="Just now"
      />

      {/* Image */}
      {post.imageUrl && (
        <PostImage
          src={post.imageUrl}
          alt={post.title}
          onClick={openPostDetail}
          style={{ cursor: "pointer" }}
        />
      )}

      {/* Content */}
      <CardContent>
        {post.title && (
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {post.title}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content}
        </Typography>
      </CardContent>

      <Divider variant="middle" />

      {/* Action buttons */}
      <Box display="flex" justifyContent="space-around" alignItems="center" py={1}>
        <Button startIcon={<ThumbUpOffAltIcon />} size="small" sx={{ color: "text.secondary" }}>
          Like
        </Button>
        <Button
          startIcon={<ChatBubbleOutlineIcon />}
          size="small"
          sx={{ color: "text.secondary" }}
          onClick={toggleComments}
        >
          Comment
        </Button>
        <Button startIcon={<ShareOutlinedIcon />} size="small" sx={{ color: "text.secondary" }}>
          Share
        </Button>
      </Box>

      {/* Comments Section */}
      {showComments && (
        <Box px={2} >
          <Divider sx={{ mb: 1 }} />

          {/* Add Comment */}
          <Box display="flex" gap={1} mb={2}mt={2}>
            <Avatar sx={{ width: 40, height: 40 }}></Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment(e)}
            />
          </Box>

          {/* Comment List */}
          <List disablePadding>
            {comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start" disableGutters>
                <ListItemAvatar>
                  <Avatar>{comment.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold">
                      {comment.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {comment.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </StyledCard>
  );
}
