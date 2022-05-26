import { useState, useEffect } from 'react';
import axios from "axios";
import { updateSpots } from "../components/helpers/updateSpots";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // * Set selected day *
  const setDay = (day) => setState({ ...state, day });

  // * Initial data request (get) *
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }))
    });
  }, []);

  // * PUT request for booking the interview *
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days })})
  };

  // * DELETE request for cancelling the interview *
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, id)
      .then(() => {
        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days })});
  };

  return { state, setDay, bookInterview, cancelInterview }
}