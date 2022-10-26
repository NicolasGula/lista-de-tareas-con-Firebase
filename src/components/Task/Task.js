import { ReactComponent as Check } from "../../assets/img/check.svg";
import { ReactComponent as Delete } from "../../assets/img/delete.svg";
import "./task.scss";

const Task = (props) => {
  const { task } = props;

  return (
    <div className="task">
      <div>
        <Check />
      </div>
      <div>{task.name}</div>
      <div>
        <Delete />
      </div>
    </div>
  );
};

export default Task;
