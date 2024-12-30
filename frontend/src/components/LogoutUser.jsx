import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  Button,
} from "@chakra-ui/react";
import { allUser } from "../store/user"; // Assuming the Zustand store is in "../store/user";
import { Link, useNavigate } from "react-router-dom";
import { FaUserNinja } from "react-icons/fa";

const LogoutUser = () => {
  const { logout, token } = allUser(); // Access logout and token from Zustand
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      status: "success",
      isClosable: true,
    });
    navigate("/");
  };

  return (
    token && (
      <Menu>
        <MenuButton>
          <Button>
            <FaUserNinja />
          </Button>
        </MenuButton>
        <MenuList>
          {/* Profile Link */}
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>

          {/* Add Product Link */}
          <MenuItem>
            <Link to="/create">Add Product</Link>
          </MenuItem>

          <MenuDivider />

          {/* Logout Button */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    )
  );
};

export default LogoutUser;
