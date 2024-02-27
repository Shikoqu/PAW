import { useLoaderData } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { getTours } from "../utils/dbProvider";

import TourCard from "../components/TourCard/TourCard";
import FilterNavBar from "../components/FilterNavBar/FilterNavBar";
import { useReservedTours } from "./RootLayout";

import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

function getFilterBounds(tours) {
  const prices = tours.map((tour) => tour.price);
  const seats = tours.map((tour) => tour.seats);
  const datesStart = tours.map((tour) => tour.dateStart.seconds);
  const datesEnd = tours.map((tour) => tour.dateEnd.seconds);
  const ratings = tours.map((tour) => tour.rating);

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    minSeats: Math.min(...seats),
    maxSeats: Math.max(...seats),
    minDate: Math.min(...datesStart),
    maxDate: Math.max(...datesEnd),
    minRating: Math.min(...ratings),
  };
}

function filterTours(tours, filters) {
  return tours.filter((tour) => {
    const meetsPriceCriteria =
      filters.minPrice <= tour.price && tour.price <= filters.maxPrice;
    const meetsSeatsCriteria =
      filters.minSeats <= tour.seats && tour.seats <= filters.maxSeats;
    const meetsDateCriteria =
      filters.minDate <= tour.dateStart.seconds &&
      tour.dateEnd.seconds <= filters.maxDate;
    const meetsRatingsCriteria = filters.minRating <= tour.rating;

    return (
      meetsPriceCriteria &&
      meetsSeatsCriteria &&
      meetsDateCriteria &&
      (meetsRatingsCriteria || isNaN(filters.minRating))
    );
  });
}

function sortTours(tours, sortOption) {
  if (sortOption === "alphabetic") {
    return tours.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "-alphabetic") {
    return tours.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price") {
    return tours.sort((a, b) => a.price - b.price);
  } else if (sortOption === "-price") {
    return tours.sort((a, b) => b.price - a.price);
  } else if (sortOption === "seats") {
    return tours.sort((a, b) => a.seats - b.seats);
  } else if (sortOption === "-seats") {
    return tours.sort((a, b) => b.seats - a.seats);
  }
}

function TourList({ bookTour, unbookTour, reservedState }) {
  const tours = useLoaderData();
  const [currency, setCurrency] = useState("USD");
  const { reservedTours, _ } = useReservedTours();
  const [sortOption, setSortOption] = useState("alphabetic");
  const [filterOptions, setFilterOptions] = useState(getFilterBounds(tours));
  const [fnsTours, setFnsTours] = useState([]);

  // Find the maximum and minimum prices
  const minPrice = filterOptions.minPrice;
  const maxPrice = filterOptions.maxPrice;

  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(5);

  useEffect(() => {
    console.log(filterOptions);
    const filtered = filterTours(tours, filterOptions);
    const sorted = sortTours(filtered, sortOption);

    setFnsTours(sorted);
  }, [tours, sortOption, filterOptions, toursPerPage]);

  // Get current tours
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = fnsTours.slice(indexOfFirstTour, indexOfLastTour);

  const next = () => {
    if (currentPage === 10) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const more = () => {
    if (toursPerPage === 10) return;
    setToursPerPage(toursPerPage + 1);
  };

  const less = () => {
    if (toursPerPage === 1) return;
    setToursPerPage(toursPerPage - 1);
  };

  // Change tours per page
  const changeToursPerPage = (event) =>
    setToursPerPage(Number(event.target.value));

  const maxPageNumber = Math.ceil(fnsTours.length / toursPerPage);

  return (
    <>
      <Outlet />
      <FilterNavBar
        setCurrency={setCurrency}
        sortOption={sortOption}
        setSortOption={setSortOption}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
      <div className="grid grid-cols-1 gap-4 place-items-center">
        {currentTours.map((tour) => {
          const quantity = reservedTours
            .filter((reservation) => reservation.tourId.id === tour.id)
            .reduce((acc, cur) => acc + cur.seats, 0);
          // console.log(quantity);

          return (
            <div key={tour.id}>
              <TourCard
                tour={tour}
                currency={currency}
                borderColor={
                  tour.price === maxPrice ? 1 : tour.price === minPrice ? -1 : 0
                }
                bookTour={bookTour}
                unbookTour={unbookTour}
                bookedByUser={quantity}
              />
            </div>
          );
        })}
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
              <strong className="text-gray-900">{maxPageNumber}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={currentPage === maxPageNumber}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={more}
              disabled={toursPerPage === 10}
            >
              <ArrowUpIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              <strong className="text-gray-900">{toursPerPage}</strong> tours
              per page
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={less}
              disabled={toursPerPage === 1}
            >
              <ArrowDownIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default TourList;

export async function loader({ params }) {
  return await getTours();
}
