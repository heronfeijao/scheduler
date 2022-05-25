import React from "react";
import "./styles.scss";
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode.js";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const { time, interview, interviewers, id, bookInterview, cancelInterview } =
    props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "Saving";
  const DELETE = "Deleting";
  const CONFIRM = "Are you sure you would like to delete?";
  const EDIT = "EDIT";
  const ERROR_SAVE = "Could not book the appointment.";
  const ERROR_DELETE = "Could not cancel the appointment.";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  useVisualMode(interview ? <Show /> : <Empty />);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const deleteConfirmation = () => {
    transition(CONFIRM);
  };

  const deleteInterview = (id) => {
    transition(DELETE, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  const editMode = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={time} />

      {mode === ERROR_DELETE && <Error message={ERROR_DELETE} onClose={back} />}

      {mode === ERROR_SAVE && <Error message={ERROR_SAVE} onClose={back} />}

      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={back}
          onConfirm={() => deleteInterview(id)}
        />
      )}

      {mode === DELETE && <Status message={DELETE} />}

      {mode === SAVING && <Status message={SAVING} />}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => deleteConfirmation()}
          onEdit={() => editMode()}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
    </article>
  );
}
