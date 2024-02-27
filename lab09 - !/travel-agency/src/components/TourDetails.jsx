import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Modal from "./Modal";

import { addRating, deleteTour, getTour } from "../utils/dbProvider";
import {
  Card,
  Button,
  CardBody,
  Typography,
  CardFooter,
  ButtonGroup,
  Progress,
  CardHeader,
  Link,
  Rating,
} from "@material-tailwind/react";
import { AuthContext } from "../utils/authProvider";
import { CommentCard } from "./CommentCard";

import format from "../utils/formatter";

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${padZero(day)}/${padZero(month)}/${year}`;
};
const padZero = (num) => (num < 10 ? `0${num}` : num);

export default function TourDetails() {
  const { user } = useContext(AuthContext);
  const tour = useLoaderData();

  console.log(tour);

  const startDate = tour.dateStart.toDate();
  const endDate = tour.dateEnd.toDate();

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const $f = (n) => format(n, currency);
  const [reservedByUser, setReservedByUser] = useState(tour.reservedSeats);
  useEffect(() => {
    setReservedByUser(tour.reservedSeats);
  }, [tour.reservedSeats]);

  const handleMinus = () => {
    setReservedByUser(reservedByUser - 1);
    subtractReservation(tour.id, auth.currentUser?.uid);
  };
  const handlePlus = () => {
    setReservedByUser(reservedByUser + 1);
    addReservation(tour.id, auth.currentUser?.uid);
  };
  const handleRate = (v) => {
    addRating(user.uid, tour.id, v);
  };

  return (
    <>
      <figure className="relative h-96 w-full">
        <img
          className="h-full w-full rounded-xl object-cover object-center"
          src={tour.imageLink}
          alt="nature image"
        />
        <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <Typography variant="h5" color="blue-gray">
              {tour.name}
            </Typography>
            <div className="flex gap-3">
              <Typography variant="h6" className="font-medium">
                {tour.country}
              </Typography>
              <Typography className="text-gray-500">
                {formattedStartDate}-{formattedEndDate}
              </Typography>
            </div>
          </div>
          <Typography
            variant="h5"
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {tour.rating}
          </Typography>
          <Rating value={0} onChange={(value) => handleRate(value)} />
          {user.role === "admin" && (
            <Typography className="flex items-center gap-1.5 font-normal">
              <Button onClick={() => deleteTour(tour.id)}>Del</Button>
            </Typography>
          )}
        </figcaption>
      </figure>

      <div className=" m-8">
        <Typography variant="h2">Description</Typography>
        <Typography variant="paragraph">{tour.description}</Typography>
      </div>

      <div className=" m-8">
        <Typography variant="h2">Comments</Typography>
        <div className="grid grid-cols-1 gap-4 place-items-center">
          {comments.map(({ user, text }, key) => {
            console.log(text);
            return <CommentCard user={user} text={text} key={key} />;
          })}
        </div>
      </div>
    </>
  );
}

const comments = [
  {
    user: { email: "test@test.test" },
    text: "lorem lorem lorem lorem rpbisuadgrui ubip buip biu ogv oib  tc iyv r x rx t ovyi vpiyv tcxriy i",
  },
  {
    user: { email: "test@test.test" },
    text: "ubiesbpuesbpu bui pbiuoyu vctyc piuv ",
  },
  {
    user: { email: "test@test.test" },
    text: "piuvpi vpi uv cex twzt tex utr xu trx iyc iytc o tuc out c",
  },
];

export async function loader({ params }) {
  return await getTour(params.id);
}
