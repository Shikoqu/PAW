import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const addReservation = async (tourId, userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const tourDocRef = doc(db, "Tours", tourId);

    const reservationsRef = collection(db, "Reservations");
    const reservationsDoc = await getDocs(
      query(
        reservationsRef,
        where("tourId", "==", tourDocRef),
        where("userId", "==", userDocRef)
      )
    );

    if (reservationsDoc.empty) {
      // Create a new reservation
      console.log("Creating a new reservation");
      await addDoc(reservationsRef, {
        tourId: tourDocRef,
        userId: userDocRef,
        seats: 1,
      });
    } else {
      // Update the existing reservation
      console.log("Updating an existing reservation");
      const reservation = reservationsDoc.docs[0];
      await updateDoc(reservation.ref, {
        seats: reservation.data().seats + 1,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const subtractReservation = async (tourId, userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const tourDocRef = doc(db, "Tours", tourId);

    const reservationsRef = collection(db, "Reservations");
    const reservationsDoc = await getDocs(
      query(
        reservationsRef,
        where("tourId", "==", tourDocRef),
        where("userId", "==", userDocRef)
      )
    );

    if (!reservationsDoc.empty) {
      const reservation = reservationsDoc.docs[0];
      const seats = reservation.data().seats;

      if (seats > 1) {
        // Update the existing reservation
        await updateDoc(reservation.ref, {
          seats: seats - 1,
        });
      } else {
        // Delete the reservation
        await deleteDoc(reservation.ref);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const addTour = async (tour) => {
  try {
    tour = {
      name: tour.name,
      country: tour.country,
      dateStart: new Date(tour.dateStart),
      dateEnd: new Date(tour.dateEnd),
      price: parseFloat(tour.price),
      seats: parseInt(tour.seats),
      description: tour.description,
      imageLink: "https://picsum.photos/300/300",
    };

    const docRef = await addDoc(collection(db, "Tours"), tour);
    return docRef.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTour = async (tourId) => {
  const tourDocRef = doc(db, "Tours", tourId);
  try {
    await deleteDoc(tourDocRef);
  } catch (error) {
    console.error(error);
  }
};

export const getTours = async () => {
  try {
    const toursDoc = await getDocs(collection(db, "Tours"));
    let tours = toursDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // get reserved seats
    tours = await Promise.all(
      tours.map(async (tour) => {
        const bookings = await getBookingsNumber(tour.id);
        return { ...tour, reservedSeats: bookings };
      })
    );

    // get rating
    tours = await Promise.all(
      tours.map(async (tour) => {
        const ratings = await getRating(tour.id);
        return { ...tour, ratings };
      })
    );

    // console.log(tours);
    return tours;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTour = async (tourId) => {
  try {
    const tourDocRef = doc(db, "Tours", tourId);
    const tourDoc = await getDoc(tourDocRef);

    if (!tourDoc.exists()) {
      console.warn(`Tour with ID ${tourId} not found`);
      return null;
    }

    const tour = { id: tourDoc.id, ...tourDoc.data() };
    tour.reservedSeats = await getBookingsNumber(tour.id);
    tour.rating = await getRating(tour.id);

    return tour;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBookingsNumber = async (tourId) => {
  try {
    const bookingsDoc = await getDocs(
      query(collection(db, "Reservations"), where("tourId", "==", tourId))
    );
    const data = bookingsDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const sum = data.reduce((acc, curr) => acc + curr.seats, 0);
    return sum;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const test = async () => {
  try {
    const reservationDocs = await getDocs(collection(db, "Reservations"));
    const data = reservationDocs.docs.map((dc) => ({
      id: dc.id,
      ...dc.data(),
    }));
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const bookingsDoc = await getDocs(
      query(collection(db, "Reservations"), where("userId", "==", userDocRef))
    );

    const bookingsData = [];

    for (const dc of bookingsDoc.docs) {
      const bookingData = {
        id: dc.id,
        ...dc.data(),
      };
      // console.log(bookingData);

      const tourId = bookingData.tourId.id;
      // console.log(tourId);
      const tripDocRef = doc(db, "Tours", tourId);
      const tripDoc = await getDoc(tripDocRef);

      if (tripDoc.exists()) {
        bookingData.price = tripDoc.data().price;
      } else {
        console.warn(`Trip with ID ${tourId} not found`);
        bookingData.price = null;
      }

      bookingsData.push(bookingData);
    }

    return bookingsData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRating = async (tourId) => {
  try {
    const tourDocRef = doc(db, "Tours", tourId);

    const ratingsDoc = await getDocs(
      query(collection(db, "Ratings"), where("tourId", "==", tourDocRef))
    );
    const ratings = ratingsDoc.docs.map((doc) => doc.data().rating);
    if (ratings.length === 0) return "-";
    const mean = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return mean;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const addRating = async (userId, tourId, rating) => {
  try {
    const tourDocRef = doc(db, "Tours", tourId);
    const userDocRef = doc(db, "users", userId);

    await setDoc(doc(db, "Ratings", userId), {
      userId: userDocRef,
      tourId: tourDocRef,
      rating: rating,
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const rolesDoc = await getDocs(
      query(collection(db, "Roles"), where("userId", "==", userDocRef))
    );
    if (rolesDoc.empty) return "guest";
    return rolesDoc.docs[0].data().role;
  } catch (error) {
    console.error(error);
    return "guest";
  }
};

export const addUserRole = async (userId, role) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(doc(db, "Roles", userId), {
      userId: userDocRef,
      role: role,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (tourId) => {
  try {
    const tourDocRef = doc(db, "Tours", tourId);

    let comments = await getDocs(
      query(collection(db, "Comments"), where("tourId", "==", tourDocRef))
    );
    // TODO !!!
  } catch (error) {
    console.error(error);
  }
};

export const getUsersWithRoles = async () => {
  try {
    const usersDoc = await getDocs(collection(db, "users"));
    let users = usersDoc.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    users = await Promise.all(
      users.map(async (user) => {
        const role = await getUserRole(user.id);
        return { ...user, role };
      })
    );

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}