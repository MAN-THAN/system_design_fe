import * as React from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceForAuth } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";
import { Typography, Container, Box, Button } from "@mui/material";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstanceForAuth.get(`${ApiEndpoints.FETCH_ALL_POSTS}/${id}`);
        setPost(res?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container
      sx={{
        py: 4,
      }}
    >
      <Typography variant="h4">{post.title}</Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
        }}
      >
        {post.content}
      </Typography>

      <Box
        sx={{
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            mr: 2,
          }}
        >
          Edit
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Container>
  );
}
