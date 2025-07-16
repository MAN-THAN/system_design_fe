import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpForm from "./components/signup";
import Login from "./components/login";
import NoPageFound from "./components/noPageFound";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import Scholars from "./components/scholar";
import { ToastContainer } from "react-toastify";
import { ScholarContextProvider } from "./context/scholarContext";
import AuthGuard from "./guards/authGuard";
import AuthRedirectGuard from "./guards/authRedirectGuard";
import PostDetail from "./components/postDetails";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

function App() {
  return (
    <ScholarContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route
              path={"/"}
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path={"/post/:id"}
              element={
                <Layout>
                  <PostDetail />
                </Layout>
              }
            />
            <Route
              path="scholars"
              element={
                <Layout>
                  <Scholars />
                </Layout>
              }
            />
          </Route>
          <Route element={<AuthRedirectGuard />}>
            <Route path="signup" element={<SignUpForm />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-left" autoClose={3000} />
    </ScholarContextProvider>
  );
}

export default App;
