import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Tab = styled.button`
  min-width: 100px;
  ${({ active }) =>
    active &&
    `
    background-color:#4681f4;
    opacity: 1;
  `}
`;

const types = ["Flight Details", "Fair Summary", "Cancellation"];
export default function Tabs({ data }) {
  const [active, setActive] = useState(types[0]);
  const { Segments } = data;
  const { Airline, Origin, Destination, Duration, CabinBaggage, Baggage } =
    Segments[0][0];
  const { AirlineCode, FlightNumber, AirlineName } = Airline;

  return (
    <div className=" bg-white relative bottom-2 border px-5 pt-2 flex flex-col gap-2 border-gray-200 ">
      <div className=" border text-sm w-fit  border-gray-300 relative   shadow ">
        {types.map((type) => (
          <Tab
            className=" px-4 py-1  border-gray-100 "
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </div>
      <div className=" border text-sm  border-gray-300 relative    dark:bg-gray-800 dark:border-gray-700">
        <div className="border-b text-sm flex items-center px-2 font-bold border-gray-300 h-10 ">
          {active === types[0] ? (
            <p>
              {Origin?.Airport.CityName} to {Destination?.Airport.CityName}, 10
              Aug
            </p>
          ) : (
            "TODO"
          )}
        </div>
        {active === types[0] ? (
          <>
            <div className="px-3 text-sm font-bold h-10 flex items-center">
              <p> {AirlineName} </p>
              <span
                className="text-sm text-gray-400 font-bold"
                style={{ fontSize: "0.66rem" }}
              >
                &nbsp;
                {AirlineCode} | {FlightNumber}
              </span>
            </div>
            <>
              <div className="flex  justify-between gap-6 px-3">
                <div className="flex w-5/12 justify-between py-3">
                  <div className="">
                    <p className="text-gray-900 text-2xl font-bold   ">
                      {moment(Origin?.["DepTime"]).format("HH:mm")}
                    </p>
                    <p className="text-xs  text-gray-500 ">Thu, 10 Aug 23</p>

                    <span className="pt-2 text-sm block capitalize font-semibold  text-gray-600">
                      Terminal {Origin?.Airport.Terminal}
                    </span>
                    <span className=" text-xs  text-gray-600">
                      {Origin?.Airport.CityName}, {Origin?.Airport.CountryName}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-xs mb-2 font-semibold">
                      {Math.floor(Duration / 60)}h {Duration % 60}m
                    </p>
                    <hr className=" h-1   bg-blue-400 border-0 rounded" />
                    <span className=" text-xs text-gray-500">Non stop</span>
                  </div>
                  <div className="">
                    <p className="text-gray-900 text-2xl font-bold   ">
                      {moment(Origin?.["DepTime"]).format("HH:mm")}
                    </p>
                    <p className="text-xs  text-gray-500 ">Thu, 10 Aug 23</p>

                    <span className="pt-2 text-sm block capitalize font-semibold  text-gray-600">
                      Terminal {Origin?.Airport.Terminal}
                    </span>
                    <span className=" text-xs  text-gray-600">
                      {Origin?.Airport.CityName}, {Origin?.Airport.CountryName}
                    </span>
                  </div>
                </div>
                <div className="flex w-6/12 gap-10 justify-start py-3 font-bold text-lg">
                  <div>
                    <p>Baggage</p>
                    <p className=" text-xs text-gray-500">
                      {CabinBaggage || "-"}
                    </p>
                  </div>
                  <div>
                    <p>Check-In</p>
                    <p className=" text-xs text-red-500">No data</p>
                  </div>
                  <div>
                    <p>Cabin</p>
                    <p className=" text-xs text-gray-500">{Baggage || "-"}</p>
                  </div>
                </div>
                {/* <div className="text-center">
                  <p className="text-gray-900 text-2xl font-bold ">
                    {" "}
                    {moment(Destination?.["ArrTime"]).format("HH:mm")}
                  </p>
                  <span className=" text-xs text-gray-500">Blr</span>
                </div>
                <div className="text-center">
                  <p className="text-gray-900 text-2xl font-bold ">7898</p>
                  <span className=" text-xs text-gray-500">Blr</span>
                </div> */}
              </div>
            </>
          </>
        ) : (
          "TODO"
        )}
      </div>
    </div>
  );
}
