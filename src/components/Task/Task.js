import { ReactComponent as Check } from "../../assets/img/check.svg";
import { ReactComponent as Delete } from "../../assets/img/delete.svg";
import firebase from "../../utils/firebase";
import "firebase/compat/firestore";
import "./task.scss";

const db = firebase.firestore(firebase);

const Task = (props) => {
  const { task } = props;

  const completeTask = () => {
    db.collection("tareas")
      .doc(task.id)
      .update({
        completed: !task.completed,
      })
      .then(() => {
        console.log("Tarea actualizada");
      });
  };

  const deleteTask = () => {
    db.collection("tareas")
      .doc(task.id)
      .delete()
      .then(() => {
        console.log("Tarea borrada");
      });
  };

  return (
    <div className="task">
      <div>
        <Check
          onClick={completeTask}
          className={task.completed ? "completed" : ""}
        />
      </div>
      <div>{task.name}</div>
      <div>
        <Delete onClick={deleteTask} />
      </div>
    </div>
  );
};

export default Task;
