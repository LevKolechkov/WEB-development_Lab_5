import "./App.scss";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/Todos/TodoList";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="list">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
