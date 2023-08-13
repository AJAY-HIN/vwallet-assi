import React, { useState } from "react";
import Tabs from "./Tabs/Tabs";
import moment from "moment";
import AirAsia from "../assets/AirAsia.png";
import Vistara from "../assets/vistara-logo.png";
import Indigo from "../assets/Indigo-Logo.png";
import Spicejet from "../assets/spicejet.png";

const images = { vistara: "../assets/AirAsia.png" };

const Card = ({ data }) => {
  const { AirlineRemark, Fare, Segments, ResultFareType, MiniFareRules } = data;
  const { Airline, Origin, Destination, Duration, CabinBaggage, Baggage } =
    Segments[0][0];
  const { AirlineCode, FlightNumber, AirlineName } = Airline;
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [isViewDetails, setIsViewDetails] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-gray-900 font-medium font-bold flex items-center">
                <img
                  src={
                    AirlineName === "Air Asia"
                      ? AirAsia
                      : AirlineName === "Vistara"
                      ? Vistara
                      : AirlineName === "Indigo"
                      ? Indigo
                      : AirlineName === "SpiceJet"
                      ? Spicejet
                      : null
                  }
                  width="30px"
                  style={{ objectFit: "cover" }}
                  alt="imagelogo"
                />
                &nbsp;
                {AirlineName}
              </p>
              <span className=" text-xs text-gray-500 font-500">
                {AirlineCode} {FlightNumber}
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-900 text-2xl font-bold   ">
                {moment(Origin?.["DepTime"]).format("HH:mm")}
              </p>
              <span className=" text-xs text-gray-500">
                {Origin.Airport.CityName}{" "}
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-xs mb-2 ">
                {Math.floor(Duration / 60)} h {Duration % 60} m
              </p>
              <hr className=" h-1   bg-blue-400 border-0 rounded" />
              <span className=" text-xs text-gray-500">Non stop</span>
            </div>
            <div className="text-center">
              <p className="text-gray-900 text-2xl font-bold ">
                {moment(Destination?.ArrTime).format("HH:mm")}
              </p>
              <span className=" text-xs text-gray-500">
                {Destination.Airport["CityName"]}
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-900 text-2xl font-bold ">
                ₹ {Math.floor(Fare["PublishedFare"]).toLocaleString()}
              </p>
              <span className=" text-xs text-gray-500"></span>
            </div>
            <button
              type="button"
              className="bg-indigo-950 text-white h-10 hover:opacity-80  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
              onClick={() => setShowPriceDetails(!showPriceDetails)}
            >
              {showPriceDetails ? "Hide Price" : "View Price"}
            </button>
          </div>
          <div
            className="flex justify-end text-xs text-blue-600 pr-3 font-semibold cursor-pointer    "
            onClick={() => setIsViewDetails(!isViewDetails)}
          >
            <span>{isViewDetails ? "Hide Details" : "View Details"}</span>
          </div>
        </div>
      </div>

      {isViewDetails && (
        <Tabs
          data={data}
          Destination={Destination}
          Origin={Origin}
          Airline={Airline}
          Duration={Duration}
        />
      )}
      {showPriceDetails && (
        <>
          <hr />
          <div className="w-full bg-white border border-gray-200 relative bottom-1 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative ">
              <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead className=" text-gray-900 font-bold uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-xs" style={{ fontSize: "0.6rem" }}>
                    <th scope="col" className="px-3 py-2 ">
                      Fare
                    </th>
                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                      Cabin Bag
                    </th>
                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                      Check-in
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Cancellation
                    </th>
                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                      Date Change
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Seat
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Meal
                    </th>
                    <th scope="col" className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                    <th
                      scope="row"
                      className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {ResultFareType}
                    </th>
                    <td className="px-3 py-2">{CabinBaggage || "--"}</td>
                    <td className="px-3 py-2">{Baggage || "--"}</td>
                    <td className="px-3 py-2 maxWidth">
                      Cancellation fee starting {MiniFareRules[0][3]?.Details}
                    </td>
                    <td className="px-3 py-2 maxWidth">
                      Date Change fee starting {MiniFareRules[0][1]?.Details}
                    </td>
                    <td className="px-3 py-2">$2999</td>
                    <td className="px-3 py-2">---</td>
                    <td className="px-2 pb-2 text-right">
                      <button
                        type="button"
                        className="bg-indigo-950 text-white mt-2 h-10 hover:opacity-80  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center "
                      >
                        Lock Price
                      </button>
                      <br />

                      <button
                        type="button"
                        className="bg-indigo-950 text-white mt-2 h-10 hover:opacity-80  focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center "
                      >
                        Book Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
