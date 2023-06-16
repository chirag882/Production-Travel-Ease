import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosinstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

const BookNow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data); 
        
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30,30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />
            <div className="flex flex-col gap-1">
              <p className="text-lg">
                <b>Journey Date</b> : {bus.journeyDate}
              </p>
              <p className="text-lg">
                <b>Fare</b> : ₹ {bus.fare} /-
              </p>
              <p className="text-lg">
                <b>Departure Time</b> : {bus.departure}
              </p>
              <p className="text-lg">
                <b>Arrival Time</b> : {bus.arrival}
              </p>
              <p className="text-lg">
                <b>Capacity</b> : {bus.capacity}
              </p>
              <p className="text-lg">
                <b>Seats Left</b> : {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl mt-2">
                Selected Seats : {selectedSeats.join(", ")}
              </h1>
              <h1 className="text-2xl">
                Fare : ₹ {bus.fare * selectedSeats.length}
              </h1>
              <hr />
              <button
                className={`primary-btn ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                onClick={bookNow}
              >
                Book Now
              </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookNow;
