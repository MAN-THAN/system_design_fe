import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { axiosInstanceForAuth } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";
import AddPost from "../components/modals/addPost";
import { ScholarContext } from "../context/scholarContext";
import { toast } from "react-toastify";
import PostCard from "../components/postCard";
import LinearIndeterminate from "../components/loader";


export default function Dashboard() {
  const [posts, setPosts] = React.useState([]);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const { scholarDetails } = React.useContext(ScholarContext);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstanceForAuth.get(ApiEndpoints.FETCH_ALL_POSTS);
      setPosts(res?.data);
    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false)
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const res = await axiosInstanceForAuth.post(ApiEndpoints.CREATE_POST, {
        ...newPost,
        authorId: scholarDetails?._id,
      });
      if (res?.status === 200) {
        toast.success("Post created successfully!");
        fetchPosts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <>
      <CssBaseline />
      {isLoading && <LinearIndeterminate />}
      <Button
        // variant="contained"
        onClick={() => setOpenAddModal(true)}
        sx={{
          position: "fixed",
          bottom: "10vh",
          right: "10vh",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 30,
          minWidth: "unset",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <img src="/plusIcon.svg"/>
      </Button>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Container>
      <AddPost openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} handleAddPost={handleAddPost} />
    </>
  );
}
