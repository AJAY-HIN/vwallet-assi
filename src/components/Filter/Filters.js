import React from "react";
import CheckBox from "./CheckBox";
import TimingFilter from "./TiminfFilter";

const Filters = ({
  handleChangeChecked,
  flightName,
  isStopApply,
  setIsStopApply,
  timing,
}) => {
  return (
    <div className="bg-white border h-fit sticky top-20 w-2/6">
      <CheckBox
        flightName={flightName}
        setIsStopApply={setIsStopApply}
        isStopApply={isStopApply}
        handleChangeChecked={handleChangeChecked}
      />
      <TimingFilter timing={timing} handleChangeChecked={handleChangeChecked} />
    </div>
  );
};

export default Filters;
