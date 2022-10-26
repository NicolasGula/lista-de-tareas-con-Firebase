import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { isEmpty } from "lodash";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import { ReactComponent as Send } from "../../assets/img/send.svg";
import "./addTask.scss";

const db = firebase.firestore(firebase);

export default function AddTask() {
  const [task, setTask] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty(task)) {
      db.collection("tareas")
        .add({
          name: task,
          completed: false,
        })
        .then(() => {
          setTask("");
          console.log("Tarea Creada");
        });
    }
  };

  return (
    <Form onSubmit={onSubmit} className="add-task">
      <input
        type="text"
        placeholder="NUEVA TAREA . . ."
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />
      <Button type="submit">
        <Send />
      </Button>
    </Form>
  );
}
