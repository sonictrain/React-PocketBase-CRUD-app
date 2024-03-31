import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Avvvatars from 'avvvatars-react';
import { signOut } from "../lib/pocketbase";

const AvatarMenu = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut();
    navigate('/');
  }

  return (
    <div className="fixed top-0 right-0 m-8 md:m-12 lg:m-20">
      <Menu>
        <MenuHandler>
          {/* replace with Avvvatars */}
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </MenuHandler>

        <MenuList>
          <MenuItem disabled className="flex items-center gap-2">
            <i className="fa-regular fa-user"></i>
            <Typography variant="small" className="font-medium">
              My Profile
            </Typography>
          </MenuItem>
          
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="flex items-center gap-2 ">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <Typography
              variant="small"
              className="font-medium"
              onClick={handleSignOut}>
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default AvatarMenu;