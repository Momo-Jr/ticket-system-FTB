import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <section className="heading">
        <h1>Welcome to support desk , How can we assist you ?</h1>
        <p>Please choose from below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to="/tickets" className="btn btn btn-block">
        <FaTicketAlt /> View Your Ticket
      </Link>
    </>
  );
}

export default Home;
