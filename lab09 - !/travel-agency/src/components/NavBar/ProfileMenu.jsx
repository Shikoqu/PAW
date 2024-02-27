import React, { useContext } from "react";
import { AuthContext } from "../../utils/authProvider";

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserIcon,
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { signout } from "../../utils/authProvider";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useContext(AuthContext);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {user.photoURL ? (
            <Avatar
              variant="circular"
              size="sm"
              alt={user.displayName ?? user.email}
              className="border border-gray-900 p-0.5"
              src={user.photoURL}
            />
          ) : (
            <UserIcon className="h-6 w-6" />
          )}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          key={1}
          onClick={closeMenu}
          className="flex items-center gap-2 rounded"
        >
          hello <strong>{user.displayName ?? user.email}</strong>
        </MenuItem>
        <MenuItem
          key={1}
          onClick={closeMenu}
          className="flex items-center gap-2 rounded"
        >
          you are <strong>{user.role}</strong>
        </MenuItem>
        <MenuItem
          key={2}
          onClick={() => {
            closeMenu;
            signout();
          }}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
