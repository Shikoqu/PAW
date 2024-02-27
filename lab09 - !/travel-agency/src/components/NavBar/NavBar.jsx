import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";

import { AuthContext } from "../../utils/authProvider.jsx";
import { Link } from "react-router-dom";

import NavList from "./NavList.jsx";
import ProfileMenu from "./ProfileMenu.jsx";
import { useReservedTours } from "../../pages/RootLayout.jsx";

function NavBar({ reservedState }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { reservedTours, _ } = useReservedTours();
  const [reservedPrice, setReservedPrice] = React.useState(0);

  React.useEffect(() => {
    const totalPrice = reservedTours.reduce(
      (acc, cur) => acc + cur.price * cur.seats,
      0
    );
    setReservedPrice(totalPrice);
  }, [reservedTours]);
  // console.log(reservedState[0]);
  // console.log(reservedPrice);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
            Travel Agecy
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <NavList price={reservedPrice} />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {isAuthenticated ? (
          <ProfileMenu />
        ) : (
          <Link to="auth/signin">
            <Button size="sm" variant="text">
              Sign in
            </Button>
          </Link>
        )}
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList price={reservedPrice} />
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
