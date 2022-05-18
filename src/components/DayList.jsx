import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {
  const { days, value, onChange } = props;
  const dayList = days.map((weekDay) => {
    return (
      <DayListItem
        key={weekDay.id}
        name={weekDay.name}
        spots={weekDay.spots}
        selected={weekDay.name === value}
        setDay={() => onChange(weekDay.name)}
      />
    );
  });

  return <ul>{dayList}</ul>;
}
