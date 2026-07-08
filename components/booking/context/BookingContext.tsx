"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BookingData = {
  service: string;
  addOns: string[];
  vehicle: {
    year: string;
    make: string;
    model: string;
    color: string;
    type: string;
    saveVehicle: boolean;
  };
};

type BookingContextType = {
  booking: BookingData;
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [booking, setBooking] = useState<BookingData>({
    service: "Complete Detail",
    addOns: [],
    vehicle: {
      year: "",
      make: "",
      model: "",
      color: "",
      type: "",
      saveVehicle: true,
    },
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be inside BookingProvider");
  }

  return context;
}