import { Link } from "react-router-dom";

function TicketItem({ ticket: { product, status, _id, createdAt } }) {
  return (
    <div className="ticket">
      <div>{new Date(createdAt).toLocaleString("en-US")}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link to={`/ticket/${_id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
