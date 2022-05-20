import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode.js";


export default function Appointment(props) {
  const { time, interview, interviewers } = props;
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
          interviewer={interview.interviewer}
        />
      )}

      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} onSave={() => console.log('onSave')} />}
    </article>
  );
}
