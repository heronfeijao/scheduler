import React, { useState, useEffect } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { interviewers, onCancel, onSave } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // * Make the form blank after cancel * \\
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // * Cancel button * \\
  const cancel = () => {
    onCancel();
    reset();
  };

  // * Remove error message after selecting interviewer * \\
  useEffect(() => {
    setError("");
  }, [interviewer]);

  // * Save form confirmation *
  function save(student, interviewer) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => {
              setError("");
              setStudent(e.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>
            Cancel
          </Button>
          <Button onClick={() => save(student, interviewer)} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
