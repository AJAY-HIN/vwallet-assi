import React, { useEffect, useState } from "react";
import Card from "./Card";
import { data } from "../data";
import Filters from "./Filter/Filters";
import moment from "moment";

const MainSection = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isDropDown, setIsDropDown] = useState(false);
  const [flightData, setFlightData] = useState(data.Response.Results?.[0]);
  const [flightName, setFlightName] = useState([
    { id: 1, checked: false, label: "Vistara" },
    { id: 2, checked: false, label: "Air Asia" },
    { id: 3, checked: false, label: "Air India" },
    { id: 4, checked: false, label: "SpiceJet" },
    { id: 5, checked: false, label: "Indigo" },
  ]);
  const [isStopApply, setIsStopApply] = useState([
    { id: 1, checked: false, label: "Direct" },
    { id: 2, checked: false, label: "Indirect" },
    { id: 3, checked: true, label: "Both" },
  ]);

  const [timing, setTiming] = useState([
    { id: 1, checked: false, label: "morning", time: "5am - 12pm" },
    { id: 2, checked: false, label: "afternoon", time: "12pm - 5pm" },
    { id: 3, checked: false, label: "evening", time: "5pm - 9pm" },
    { id: 4, checked: false, label: "night", time: "9pm - 5am" },
  ]);

  const handleChangeChecked = (id, check) => {
    if (check === "checkingStop") {
      const isStopApplyState = isStopApply;
      const checkedStop = isStopApplyState.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : { ...item, checked: false }
      );
      setIsStopApply(checkedStop);
    } else if (check === "timing") {
      const timingState = timing;
      const checkedtiming = timingState.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : { ...item, checked: false }
      );
      setTiming(checkedtiming);
    } else {
      const flightNameState = flightName;
      const checkedFlight = flightNameState.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setFlightName(checkedFlight);
    }
  };

  const applyFilter = () => {
    // Filter by flight name
    let updatedData = data.Response.Results[0];

    const flightChecked = flightName
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (flightChecked.length) {
      updatedData = updatedData.filter((item) =>
        flightChecked.includes(item.Segments?.[0]?.[0]?.Airline.AirlineName)
      );
    }

    // filter by Stops
    const stopChecked = isStopApply
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (stopChecked.length) {
      if (stopChecked[0] === "Direct") {
        updatedData = updatedData.filter(
          (item) => item.Segments[0][0].StopOver === false
        );
      } else if (stopChecked[0] === "Indirect") {
        updatedData = updatedData.filter(
          (item) => item.Segments[0][0].StopOver === true
        );
      } else {
        if (flightChecked.length) {
          updatedData = updatedData.filter((item) =>
            flightChecked.includes(item.Segments?.[0]?.[0]?.Airline.AirlineName)
          );
        }
      }
    }

    //filter by timing
    // 5:00 Am to 12:00PM as Morning
    // 12:00PM to 5:00 as Afternoon
    // 5:00Pm to 9:00PM as Evening
    // 9:00PM to 5:00AM as Night
    const timingChecked = timing
      .filter((item) => item.checked)
      .map((item) => item.label);

    if (timingChecked.includes("morning")) {
      updatedData = updatedData.filter(
        (item) =>
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isAfter(moment("5:00", "h:mma")) &&
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isBefore(moment("12:00", "h:mma"))
      );
    }
    if (timingChecked.includes("afternoon")) {
      updatedData = updatedData.filter(
        (item) =>
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isAfter(moment("12:00", "h:mma")) &&
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isBefore(moment("17:00", "h:mma"))
      );
    }
    if (timingChecked.includes("night")) {
      updatedData = updatedData.filter(
        (item) =>
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isAfter(moment("21:00", "h:mma")) &&
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isBefore(moment("7:00", "h:mma"))
      );
    }
    if (timingChecked.includes("evening")) {
      updatedData = updatedData.filter(
        (item) =>
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isAfter(moment("17:00", "h:mma")) &&
          moment(
            `
          ${moment(item.Segments[0][0].Origin.DepTime).format("HH:mm")}
          `,
            "h:mma"
          ).isBefore(moment("21:00", "h:mma"))
      );
    }

    setFlightData(updatedData);
  };

  useEffect(() => {
    applyFilter();
  }, [flightName, isStopApply, timing]);

  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-between w-4/5 bg-gray-200 align-middle px-6 py-6 shadow-lg ">
        <div>
          <h1 className="text-lg font-bold">
            Total results :-{" "}
            <span className="text-base text-gray-600">
              {flightData.length} results found
            </span>
          </h1>
        </div>
        {/* sorting  */}
        <div className="relative">
          <input
            type="checkbox"
            id="sortbox"
            className="hidden absolute"
            onChange={() => setIsDropDown(!isDropDown)}
          />
          <label
            for="sortbox"
            className="flex items-center space-x-1 cursor-pointer"
          >
            <span className="text-sm font-[650]">Sort By</span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </label>
          {isDropDown && (
            <div
              id="sortboxmenu"
              className={` absolute mt-1 right-1 top-full min-w-max shadow rounded   bg-gray-200 border border-gray-400 transition delay-75 ease-in-out z-10`}
            >
              <ul className="block text-right text-gray-900">
                <li onClick={() => setIsDropDown(!isDropDown)}>
                  <a className="block px-3 py-2 hover:bg-gray-200">
                    Price: Low to High
                  </a>
                </li>
                <li onClick={() => setIsDropDown(!isDropDown)}>
                  <a className="block px-3 py-2 hover:bg-gray-200">
                    Price: High to Low
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* filter */}
      <div className="flex gap-2 justify-between w-4/5 pt-2">
        <Filters
          flightName={flightName}
          handleChangeChecked={handleChangeChecked}
          setIsStopApply={setIsStopApply}
          isStopApply={isStopApply}
          timing={timing}
        />
        <div className="flex flex-col w-full gap-2">
          {!flightData.length ? (
            <div className="flex justify-center">
              <h1 className="text-2xl font-bold mt-10">No Data found!</h1>
            </div>
          ) : (
            flightData?.map((ele, index) => (
              <>
                <Card data={ele} />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
