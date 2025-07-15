import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { axiosInstanceForAuth } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";

export default function Dashboard() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const res = await axiosInstanceForAuth.get(ApiEndpoints.FETCH_ALL_POSTS);
      setPosts(res?.data);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Posts
        </Typography>
        <Grid container spacing={4}>
          {posts?.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2">{post.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
