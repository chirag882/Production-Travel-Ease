import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosinstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Row } from "antd";
import Bus from "../components/Bus";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [filters, setFilters] = useState({});
  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      // console.log(key)
      // console.log(filters[key])
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    // console.log(filters);
    // console.log(tempFilters);
    try {
      dispatch(ShowLoading());
      // console.log(filters);
      // console.log(tempFilters);
      const response = await axios.post(
        "/api/buses/get-all-buses",
        tempFilters,
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
        }
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleCancle = async () => {
    setFilters({
      from: "",
      to: "",
      journeyDate: "",
    });
    getBuses();
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="text"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </Col>
          <Col lg={6} sm={24}>
            <input
              type="date"
              placeholder="Date"
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
            />
          </Col>
          <Col lg={6} sm={24}>
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
              <button className="outlined px-3" onClick={handleCancle}>
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
