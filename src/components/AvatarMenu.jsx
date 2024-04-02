import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Avvvatars from 'avvvatars-react';
import { signOut } from "../lib/pocketbase";

const AvatarMenu = ({ email }) => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut();
    navigate('/');
  }

  return (
    <div className="fixed top-0 right-0 m-8 md:m-12 lg:m-20">
      <Menu>
        <MenuHandler>
          <div>
          <Avvvatars value={ email } style="shape" shadow={false} size={48} />
          </div>
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