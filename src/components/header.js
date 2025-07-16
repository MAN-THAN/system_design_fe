import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ApiEndpoints } from "../config";
import { toast } from "react-toastify";
import { ScholarContext } from "../context/scholarContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
}));

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scholarDetails, setScholarDetails } = React.useContext(ScholarContext);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(ApiEndpoints.LOGOUT, {
        _id: scholarDetails._id,
      });
      if (res?.status === 200) {
        toast.success("Logged out!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("scholarDetails");
        setScholarDetails({});
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message || "Logout failed");
    }
  };

  const goToDashboard = () => {
    navigate("/");
  };

  const goToScholars = () => {
    navigate("/scholars");
  };

  return (
    <StyledAppBar sx={{position : 'sticky', top : '0%'}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{location.pathname === "/scholars" ? "Scholars List" : "Dashboard"}</Typography>

        <div>
          {location.pathname !== "/" && (
            <Button color="inherit" sx={{ mr: 2 }} variant="outlined" onClick={goToDashboard}>
              Dashboard
            </Button>
          )}

          {location.pathname !== "/scholars" && (
            <Button color="inherit" sx={{ mr: 2 }} variant="outlined" onClick={goToScholars}>
              Scholars
            </Button>
          )}

          <Button
            color="secondary"
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#fff",
              color: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </StyledAppBar>
  );
}
