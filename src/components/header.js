import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";
import { toast, ToastContainer } from "react-toastify";
import { ScholarContext } from "../context/scholarContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scholarDetails, setScholarDetails } =
  React.useContext(ScholarContext);
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(ApiEndpoints.LOGOUT, {
        _id: scholarDetails._id,
      });
      if (res?.status === 200) {
        toast.success('logged out!')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("scholarDetails");
        setScholarDetails({});
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const goToDashboard = () => {
    navigate("/");
  };

  const goToScholars = () => {
    navigate("/scholars");
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {location.pathname === "/scholars" ? "Scholars List" : "My Dashboard"}
        </Typography>

        {location.pathname !== "/" && (
          <Button
            color="primary"
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={goToDashboard}
          >
            Dashboard
          </Button>
        )}

        {location.pathname !== "/scholars" && (
          <Button
            color="primary"
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={goToScholars}
          >
            Scholars
          </Button>
        )}

        <Button color="primary" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}
