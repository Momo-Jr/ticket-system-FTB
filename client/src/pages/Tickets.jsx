import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, getTickets } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <div>Tickets</div>;
}

export default Tickets;
