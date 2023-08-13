import React from "react";
import { ReactComponent as MorningIcon } from "../../assets/morning.svg";
import { ReactComponent as NightIcon } from "../../assets/night.svg";

const TimingFilter = ({ timing, handleChangeChecked }) => {
  return (
    <div className="flex justify-around m-3  ">
      {timing.map((ele) => (
        <div
          className={` ${
            ele.checked ? `bg-blue-600 text-white` : `bg-white `
          } w-14 h-16 border rounded text-center text-[0.65rem] font-[500] flex flex-col items-center justify-center cursor-pointer`}
          key={ele.id}
          onClick={() => handleChangeChecked(ele.id, "timing")}
        >
          {ele.label === "morning" ? (
            <MorningIcon />
          ) : ele.label === "night" ? (
            <NightIcon />
          ) : (
            <MorningIcon />
          )}
          <p className="capitalize ">{ele.label}</p>
          <p className="uppercase">{ele.time}</p>
        </div>
      ))}
    </div>
  );
};

export default TimingFilter;
