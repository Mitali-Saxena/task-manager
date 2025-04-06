import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./features/taskSlice";
import Login from "./components/Login";
import TaskList from "./components/TaskList";

const App = () => {
  console.log("App component is rendering...");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching fetchTasks...");
    dispatch(fetchTasks());  
  }, [dispatch]);

  return (
    <>
      <Login />
      <TaskList />
    </>
  );
};

export default App;
