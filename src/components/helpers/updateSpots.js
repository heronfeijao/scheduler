export function updateSpots(state, appointments) {
  const dayAppointments = state.days.find(day => day.name === state.day).appointments;
  const daySpots = dayAppointments.filter(id => !appointments[id].interview).length;

  const dayIndex = state.days.findIndex(day => day.name === state.day);

  const updatedDay = { ...state.days[dayIndex] };

  updatedDay.spots = daySpots;

  const updatedDays = [...state.days];
  updatedDays[dayIndex] = updatedDay;

  return updatedDays;
};