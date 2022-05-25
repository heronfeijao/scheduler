import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";
import { formatSpots } from "./helpers/formatSpots";

export default function DayListItem(props) {
  const { selected, spots, name, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li data-testid='day' className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
