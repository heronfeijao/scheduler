export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((eachDay) => eachDay.name === day);
  if (!filteredDays.length) return []

  const dayAppointments = filteredDays[0].appointments
  const appointments = []

  for (let id in state.appointments) {
    if (dayAppointments.includes(Number(id))) {
      appointments.push(state.appointments[id])
    }
  }

  return appointments
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];
  return {student, interviewer}
}