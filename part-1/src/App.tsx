import React, { Component } from "react";

type TaskStatusType = "common" | "urgent" | "hot";

type TaskType = {
  id: string;
  label: string;
  done: boolean;
  status: TaskStatusType;
};

type ToDoStateType = {
  list: TaskType[];
  textInput: string;
  taskStatus: TaskStatusType;
  currentId: number;
};
class App extends Component<{}, ToDoStateType> {
  public state: ToDoStateType = {
    currentId: 1,
    list: [],
    taskStatus: "common",
    textInput: ""
  };

  private statusIcon = {
    common: "❄️",
    hot: "🔥",
    urgent: "⭐️"
  };

  public handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ textInput: event.target.value });
  };

  public handleAddTask = () => {
    this.setState(state => {
      const { list, textInput, taskStatus, currentId } = state;

      // Если поле пустое, то ничего не изменяем
      if (!textInput) {
        return state;
      }

      list.push({
        done: false,
        id: String(currentId),
        label: textInput,
        status: taskStatus
      });

      return {
        ...state,
        currentId: currentId + 1, // увеличиваем следующий ID
        list,
        textInput: "" // Очищаем поле после добавления
      };
    });
  };

  public handleChangeTypeTask = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const taskStatus = event.target.value as ToDoStateType["taskStatus"];

    this.setState({ taskStatus });
  };

  public handleDeleteTask = (id: string) => () => {
    this.setState(state => {
      const { list } = state;

      const index = list.findIndex(el => String(el.id) === id);

      list.splice(index, 1);

      return { ...state, list };
    });
  };

  public render() {
    const { list, textInput, taskStatus } = this.state;
    return (
      <div>
        <h1>To-Do list:</h1>
        <div>
          <select
            id="taskStatus"
            onChange={this.handleChangeTypeTask}
            value={taskStatus}
          >
            <option value="common">Common ❄️</option>
            <option value="urgent">Urgent ⭐️</option>
            <option value="hot">Hot 🔥</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            onChange={this.handleChangeText}
            value={textInput}
          />
          <button onClick={this.handleAddTask}>Add</button>
        </div>
        <div>
          <ul>
            {list.map(el => (
              <li key={el.id}>
                {`${this.statusIcon[el.status]} ${el.label}`}
                <button onClick={this.handleDeleteTask(el.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
