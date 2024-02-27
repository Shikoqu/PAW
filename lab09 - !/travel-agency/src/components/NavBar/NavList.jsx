import { useContext } from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import { ShoppingCartIcon, TicketIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/authProvider";

function NavList({ price }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {isAuthenticated && <Link to="/tours">
        <Typography
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <TicketIcon className="h-[18px] w-[18px]" />
            <span className="text-gray-900"> Tours</span>
          </MenuItem>
        </Typography>
      </Link>}

      {user.role === "admin" && (
        <Link to="/tours/add">
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              <TicketIcon className="h-[18px] w-[18px]" />
              <span className="text-gray-900"> add tour</span>
            </MenuItem>
          </Typography>
        </Link>
      )}

      {isAuthenticated && (
        <Link to="/tours">
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              <ShoppingCartIcon className="h-[18px] w-[18px]" />
              <span className="text-gray-900"> Cart ${price}</span>
            </MenuItem>
          </Typography>
        </Link>
      )}

      {user.role === "admin" && (
        <Link to="/users">
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              <TicketIcon className="h-[18px] w-[18px]" />
              <span className="text-gray-900"> users</span>
            </MenuItem>
          </Typography>
        </Link>
      )}
      {/* {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))} */}
    </ul>
  );
}

export default NavList;
