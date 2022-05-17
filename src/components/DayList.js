import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayList = props.days.map((weekDay) => {
    return (
      <DayListItem
        key={weekDay.id}
        name={weekDay.name}
        spots={weekDay.spots}
        selected={weekDay.name === props.day}
        setDay={props.setDay}
      />)
  })

  return (
    <ul>
      {dayList}
    </ul>
  );
}