import React, { useState, useEffect } from "react";
import {
  CardFooter,
  Button,
  ButtonGroup,
  Progress,
  Typography,
} from "@material-tailwind/react";

import { FaPlus, FaMinus } from "react-icons/fa";
import { addReservation, subtractReservation } from "../../utils/dbProvider";
import { auth } from "../../firebase";

import format from "../../utils/formatter";


function TourCardFooter({ tour, currency, bookedByUser }) {
  const $f = (n) => format(n, currency);
  const [reservedByUser, setReservedByUser] = useState(bookedByUser);
  useEffect(() => {
    setReservedByUser(bookedByUser);
  }, [bookedByUser]);

  const handleMinus = () => {
    setReservedByUser(reservedByUser - 1);
    subtractReservation(tour.id, auth.currentUser?.uid);
  };
  const handlePlus = () => {
    setReservedByUser(reservedByUser + 1);
    addReservation(tour.id, auth.currentUser?.uid);
  };
  tour.reservedSeats = reservedByUser;

  return (
    <CardFooter className="pt-3 ">
      <div className="w-full mb-4">
        <Progress
          value={(100 * tour.reservedSeats) / tour.seats}
          size="lg"
          className="mb-4"
          color="gray"
        />
      </div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="green">{$f(tour.price)}</Typography>
        <Typography color="gray">
          {tour.reservedSeats} / {tour.seats}
        </Typography>
        <ButtonGroup size="md">
          <Button disabled>{reservedByUser}</Button>
          <Button
            disabled={reservedByUser == 0}
            onClick={() => {
              // unbookTour();
              handleMinus();
            }}
          >
            <FaMinus />
          </Button>
          <Button
            disabled={tour.reservedSeats >= tour.seats}
            onClick={() => {
              // bookTour();
              handlePlus();
            }}
          >
            <FaPlus />
          </Button>
        </ButtonGroup>
      </div>
    </CardFooter>
  );
}

export default TourCardFooter;
