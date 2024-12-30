import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ExternalPage from "./components/ExternalPage";
import Navbar from "./components/Navbar";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import UserProfile from "./components/UserProfile";
import Cart from "./components/cart";
import IndexPage from "./pages/IndexPage";
import Footer from "./components/Footer";
function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* // <Box minH={"100vh"} bg={useColorModeValue("cyan.50", "cyan.800")}> */}
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/external" element={<ExternalPage />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer></Footer>
    </Box>
  );
}

export default App;
