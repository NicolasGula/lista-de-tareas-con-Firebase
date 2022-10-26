import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AddTask from "./components/AddTask/index";
import { map, size } from "lodash";
import firebase from "./utils/firebase";
import "firebase/compat/firestore";
import "./app.scss";
import Task from "./components/Task/Task";

const db = firebase.firestore(firebase);

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    db.collection("tareas")
      .orderBy("completed")
      .get()
      .then((response) => {
        const arrayTasks = [];
        map(response.docs, (task) => {
          const data = task.data();
          data.id = task.id;
          arrayTasks.push(data);
        });
        setTasks(arrayTasks);
      });
  }, [tasks]);

  return (
    <Container fluid className="app">
      <div className="title">
        <h1>Lista de tareas con Firebase</h1>
      </div>
      <Row className="todo">
        <Col
          className="todo__title"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <h2>Tareas</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) === 0 ? (
            <h3>No hay tareas</h3>
          ) : (
            map(tasks, (task, index) => <Task key={index} task={task} />)
          )}
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
        >
          <AddTask />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
