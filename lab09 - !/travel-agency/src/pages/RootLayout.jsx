import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { getBookingsByUser } from "../utils/dbProvider";
import { auth } from "../firebase";

const ReservedToursContext = createContext();

export const useReservedTours = () => {
  return useContext(ReservedToursContext);
};

function NavBarLayout() {
  const [reservedTours, setReservedTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookingsByUser(auth.currentUser?.uid).then((bookings) => {
      setReservedTours(bookings);
    });
  }, []);

  const bookTour = (tour) => {
    setReservedTours([...reservedTours, tour]);
  };

  const unbookTour = (tour) => {
    const newReservedTours = reservedTours.filter((t) => t.id !== tour.id);
    setReservedTours(newReservedTours);
  };

  return (
    <ReservedToursContext.Provider value={{ reservedTours, setReservedTours }}>
      <NavBar bookTour={bookTour} unbookTour={unbookTour} />
      <Outlet navigate={navigate} />
    </ReservedToursContext.Provider>
  );
}

export default NavBarLayout;
