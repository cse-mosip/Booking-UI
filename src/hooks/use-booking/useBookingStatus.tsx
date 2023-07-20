import { useState } from "react";
import BookingServices from "src/services/BookingServices";
import { User } from "src/types";
import { useSelector } from "react-redux";
import { AppState } from "src/redux/reducer";

interface UseBookingStatusResult {
  status: string;
  loading: boolean;
  error: string;
  handleAccept: () => Promise<void>;
  handleReject: () => Promise<void>;
}

export const useBookingStatus = (id: string, init_status: string): UseBookingStatusResult => {
    const [status, setStatus] = useState(init_status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const user: User | null = useSelector((state: AppState) => state.user.user);
  
    const handleStatus = async (status: string) => {
      try {
        setLoading(true);
        const token = user.token;
  
        const data = await BookingServices.updateBookingStatus(
          id,
          status,
          token
        );
        setStatus(data.status);
      } catch (error) {
        console.error(error);
        setError("Error occurred while updating status.");
      } finally {
        setLoading(false); 
      }
    };
  
    const handleAccept = async () => {
      await handleStatus("APPROVED");
    };
  
    const handleReject = async () => {
      await handleStatus("REJECTED");
    };
  
    return { status, loading, error, handleAccept, handleReject };
  };
  