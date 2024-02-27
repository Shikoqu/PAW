import { Button, CardBody, Typography } from "@material-tailwind/react";

import { deleteTour } from "../../utils/dbProvider";
import { AuthContext } from "../../utils/authProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${padZero(day)}/${padZero(month)}/${year}`;
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

function TourCardBody({ tour }) {
  const { user } = useContext(AuthContext);

  const startDate = tour.dateStart.toDate();
  const endDate = tour.dateEnd.toDate();

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <CardBody>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex-row items-center gap-2">
          <Link to={`/tour/${tour.id}`}>
            <Typography variant="h4" className="font-bold">
              {tour.name}
            </Typography>
          </Link>
          <div className="flex gap-3">
            <Typography variant="h6" className="font-medium">
              {tour.country}
            </Typography>
            <Typography className="text-gray-500">
              {formattedStartDate}-{formattedEndDate}
            </Typography>
          </div>
        </div>
        <Typography className="flex items-center gap-1.5 font-normal">
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
          {tour.ratings}
        </Typography>
        {user.role === "admin" && (
          <Typography className="flex items-center gap-1.5 font-normal">
            <Button onClick={() => deleteTour(tour.id)}>Del</Button>
          </Typography>
        )}
      </div>
      <Typography className="h-[4.5rem] overflow-y-auto" color="gray">
        {tour.description}
      </Typography>
    </CardBody>
  );
}

export default TourCardBody;
