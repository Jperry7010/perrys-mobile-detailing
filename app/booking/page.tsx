import BookingForm from "../../components/booking/BookingForm";
import { BookingProvider } from "../../components/booking/context/BookingContext";

export default function BookingPage() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-black text-white">
        <BookingForm />
      </main>
    </BookingProvider>
  );
}