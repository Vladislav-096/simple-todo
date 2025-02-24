import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../TodoList";
import { TodoData, Status } from "../../../types/types";
// import * as localStorageActions from '../../../utils/localStorageActions';

// Mock localStorage actions
jest.mock("../../../utils/localStorageActions", () => ({
  getItemFromLocalStorage: jest.fn(),
  setItemToLocalStorage: jest.fn(),
}));

// Mock SVG imports
jest.mock("../../../../public/img/edit.svg", () => "edit-icon-mock");
jest.mock("../../../../public/img/remove.svg", () => "remove-icon-mock");

describe("TodoList Component", () => {
  const mockSetTaskList = jest.fn();
  // const mockSetFilteredList = jest.fn();

  const mockTasks: TodoData[] = [
    { id: "1", value: "Test task 1", status: Status.Active },
    { id: "2", value: "Test task 2", status: Status.Completed },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("todo-list", JSON.stringify(mockTasks));
  });

  it("renders list of tasks", () => {
    render(<TodoList taskList={mockTasks} setTaskList={mockSetTaskList} />);

    expect(screen.getByText("Test task 1")).toBeInTheDocument();
    expect(screen.getByText("Test task 2")).toBeInTheDocument();
  });

  it("toggles task status on edit button click", () => {
    render(<TodoList taskList={mockTasks} setTaskList={mockSetTaskList} />);

    const editButtons = screen.getAllByAltText("Edit Icon");
    fireEvent.click(editButtons[0]);

    expect(mockSetTaskList).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: "1",
          status: Status.Completed,
        }),
      ])
    );
  });

  it("removes task on remove button click", () => {
    render(
      <TodoList
        taskList={mockTasks}
        setTaskList={mockSetTaskList}
        // setFilteredList={mockSetFilteredList}
      />
    );

    const removeButtons = screen.getAllByAltText("Remove Icon");
    fireEvent.click(removeButtons[0]);

    expect(mockSetTaskList).toHaveBeenCalledWith(
      expect.not.arrayContaining([
        expect.objectContaining({
          id: "1",
        }),
      ])
    );
  });
});
