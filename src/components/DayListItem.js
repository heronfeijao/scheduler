import React from "react";
import classNames from "classnames";
import './DayListItem.scss';

const formatSpots = (spots) => {
  return (
    <>
      {spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
      {spots > 1 && <h3 className="text--light">{spots} spots remaining</h3>}
    </>
  );
}

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}