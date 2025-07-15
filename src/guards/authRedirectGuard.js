import { useContext } from "react";
import { ScholarContext } from "../context/scholarContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRedirectGuard(){
    const {scholarDetails} = useContext(ScholarContext);
    const token = localStorage.getItem('accessToken');
    const isAuthrnticated = token && scholarDetails;
    return isAuthrnticated ? <Navigate to={'/'} replace /> : <Outlet />

}