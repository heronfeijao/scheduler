import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode.js";

export default function Appointment(props) {
  const { time, interview, interviewers, id, bookInterview, cancelInterview } =
    props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "Saving";
  const DELETE = "Deleting";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  useVisualMode(interview ? <Show /> : <Empty />);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  };

  const deleteInterview = (id) => {
    transition(DELETE);
    cancelInterview(id).then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === DELETE && <Status message={DELETE} />}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => deleteInterview(id)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
    </article>
  );
}
