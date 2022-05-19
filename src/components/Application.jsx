import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.jsx";
import { getAppointmentsForDay } from "./helpers/selectors.js";
// import Header from "./Appointment/Header.jsx";
// import Show from "./Appointment/Show.jsx";
// import Confirm from "./Appointment/Confirm.jsx";
// import Empty from "./Appointment/Empty.jsx";
// import Error from "./Appointment/Error.jsx";
// import Form from "./Appointment/Form.jsx";
// import Status from "./Appointment/Status.jsx";

export default function Application(props) {
  // const [day, setDay] = useState([]);
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // Object.values(appointments)

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev, days}))

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data }));
      // setState((prev) => ({ ...prev, days: all[1].data }));
      // setState((prev) => ({ ...prev, appointments: all[2].data }));
      console.log('0', all[0].data); // first
      console.log('1',all[1].data); // second
      console.log('2',all[2].data); // third
    });
  }, []);

  const appointmentList = dailyAppointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
