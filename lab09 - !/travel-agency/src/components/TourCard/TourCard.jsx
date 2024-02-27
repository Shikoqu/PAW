import { Card } from "@material-tailwind/react";

import TourCardHeader from "./TourCardHeader";
import TourCardBody from "./TourCardBody";
import TourCardFooter from "./TourCardFooter";

function TourCard({
  tour,
  borderColor,
  currency,
  bookTour,
  unbookTour,
  bookedByUser,
}) {
  return (
    <Card
      className={`h-[18.25rem] w-[48rem] flex-row border-2 ${
        borderColor === 1 ? "border-red-500" : ""
      }${borderColor === -1 ? "border-green-500" : ""}`}
    >
      <TourCardHeader imgSrc={tour.imageLink} />
      <div className="flex flex-col justify-between w-full">
        <TourCardBody tour={tour} />
        <TourCardFooter
          tour={tour}
          currency={currency}
          bookedByUser={bookedByUser}
        />
      </div>
    </Card>
  );
}

export default TourCard;
