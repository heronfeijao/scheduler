import React from "react";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form";

export default function Appointment(props) {
  const { time, interview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  useVisualMode(interview ? <Show /> : <Empty />);

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}

      {mode === CREATE && <Form />}
    </article>
  );
}
