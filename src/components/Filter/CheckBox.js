import React from "react";

const CheckBox = ({
  handleChangeChecked,
  flightName,
  setIsStopApply,
  isStopApply,
  children,
}) => {
  return (
    <>
      <div className="m-3">
        <h1 className="text-lg font-bold">Filter by Timimg</h1>
        {flightName.map((flight) => (
          <div className="flex items-center py-2 px-1" key={flight.id}>
            <input
              checked={flight.checked}
              onChange={() => handleChangeChecked(flight.id)}
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {flight.label}
            </label>
          </div>
        ))}
      </div>
      {/* Check box for stops */}
      <div className="m-3">
        <h1 className="text-lg font-bold">Filter by Stop</h1>
        {isStopApply.map((ele) => (
          <div className="flex items-center py-2 px-1" key={ele.id}>
            <input
              checked={ele.checked}
              onChange={() => handleChangeChecked(ele.id, "checkingStop")}
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {ele.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckBox;
