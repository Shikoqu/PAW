import { useContext, useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import SelectCurrency from "./SelectCurrency";

function SortNavList({ setCurrency, sortOption, setSortOption }) {
  const handleSortAlphabetic = () => {
    if (sortOption === "alphabetic") {
      setSortOption("-alphabetic");
    } else {
      setSortOption("alphabetic");
    }
  };
  const handleSortPrice = () => {
    if (sortOption === "price") {
      setSortOption("-price");
    } else {
      setSortOption("price");
    }
  };
  const handleSortSeats = () => {
    if (sortOption === "seats") {
      setSortOption("-seats");
    } else {
      setSortOption("seats");
    }
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Button size="md" ripple="light" onClick={handleSortAlphabetic}>
        Sort Alphabetically
        {sortOption === "alphabetic" && <span>&uarr;</span>}
        {sortOption === "-alphabetic" && <span>&darr;</span>}
      </Button>
      <Button size="md" ripple="light" onClick={handleSortPrice}>
        Sort by Price
        {sortOption === "price" && <span>&uarr;</span>}
        {sortOption === "-price" && <span>&darr;</span>}
      </Button>
      <Button size="md" ripple="light" onClick={handleSortSeats}>
        Sort by Seats
        {sortOption === "seats" && <span>&uarr;</span>}
        {sortOption === "-seats" && <span>&darr;</span>}
      </Button>
      <SelectCurrency onChange={setCurrency} />
    </ul>
  );
}

function FilterNavList({ filterOptions, setFilterOptions }) {
  const handelChange = (e, arg) => {
    const priceMinMax = filterOptions.minPrice <= filterOptions.maxPrice;
    const seatsMinMax = filterOptions.minSeats <= filterOptions.maxSeats;
    // const dateMinMax = filterOptions.minDate.seconds <= filterOptions.maxDate.seconds;
    // const ratingMin =  0 <= filterOptions.minRating && filterOptions.minRating <= 5;

    if (priceMinMax && seatsMinMax) {
      setFilterOptions({ ...filterOptions, [arg]: e.target.value });
    }
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="w-48">
        <Input
          variant="standard"
          label="min price"
          value={filterOptions.minPrice}
          type="number"
          onChange={(e) => handelChange(e, "minPrice")}
        />
        <Input
          variant="standard"
          label="max price"
          value={filterOptions.maxPrice}
          type="number"
          onChange={(e) => handelChange(e, "maxPrice")}
        />
      </div>
      <div className="w-48">
        <Input
          variant="standard"
          label="min seats"
          value={filterOptions.minSeats}
          type="number"
          onChange={(e) => handelChange(e, "minSeats")}
        />
        <Input
          variant="standard"
          label="max seats"
          value={filterOptions.maxSeats}
          type="number"
          onChange={(e) => handelChange(e, "maxSeats")}
        />
      </div>
      <div className="w-48">
        <Input
          variant="standard"
          label="min date"
          value={filterOptions.minDate}
          type="date"
          onChange={(e) => handelChange(e, "minDate")}
        />
        <Input
          variant="standard"
          label="max date"
          value={filterOptions.maxDate}
          type="date"
          onChange={(e) => handelChange(e, "maxDate")}
        />
      </div>
      <Input
        variant="standard"
        label="min rating"
        value={filterOptions.minRating}
        type="number"
        onChange={(e) => handelChange(e, "minRating")}
      />{" "}
    </ul>
  );
}

function NavBar({
  setCurrency,
  sortOption,
  setSortOption,
  filterOptions,
  setFilterOptions,
}) {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3 z-50">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
            Sort
          </Typography>
          <div className="hidden lg:block">
            <SortNavList
              setCurrency={setCurrency}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <SortNavList
            setCurrency={setCurrency}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </Collapse>
      </Navbar>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3 z-50">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
            Filter
          </Typography>
          <div className="hidden lg:block">
            <FilterNavList
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <FilterNavList
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </Collapse>
      </Navbar>
    </>
  );
}

export default NavBar;
