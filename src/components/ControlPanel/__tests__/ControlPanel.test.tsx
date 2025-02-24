import { render, screen, fireEvent } from "@testing-library/react";
import { ControlPanel } from "../ControlPanel";
import { TodoData, Status } from "../../../types/types";
import * as localStorageActions from "../../../utils/localStorageActions";

// Mock localStorage actions
// Заменяет реальный модуль ../../../utils/localStorageActions на мок-версию.
jest.mock("../../../utils/localStorageActions", () => ({
  getItemFromLocalStorage: jest.fn(), // Создается мок-функция для getItemFromLocalStorage
  setItemToLocalStorage: jest.fn(),
}));

describe("ControlPanel Component", () => {
  // Просто мок функция. Делает ни ху я.
  // Когда, ниже, передам ее в пропс в компонент, она сделат нихуя, но, тесты пойму, что это мок конкретного пропса (?)
  // И я смогу посмотреть: сколько раз она была вызвана, с какими параметрами, что она вернула (если захочу)
  const mockSetTaskList = jest.fn();
  // const mockSetFilteredList = jest.fn();

  const mockTasks: TodoData[] = [
    { id: "1", value: "Active task", status: Status.Active },
    { id: "2", value: "Completed task", status: Status.Completed },
  ];

  // beforeEach - метод, который будет выполняться перед каждым тестом
  beforeEach(() => {
    // Очищает все моки
    jest.clearAllMocks();
    // localStorageActions.getItemFromLocalStorage - ссылка на функцию.
    // as jest.Mock - протипизировал, что это мок, а не просто функция
    // .mockReturnValue - указывает, какое значение должна возвращать функция
    (localStorageActions.getItemFromLocalStorage as jest.Mock).mockReturnValue(
      mockTasks
    );
  });

  // it - то же самое, что и test
  it("renders all filter buttons", () => {
    // render рендерит компонент в тестах. Рендерит его в виртуальном DOM,
    // чтобы можно было выполнять проверки не влияя на реальное состояние страницы.
    // Делает компонент доступным для тестирования.
    render(
      <ControlPanel
        // taskList={mockTasks}
        setTaskList={mockSetTaskList}
        // setFilteredList={mockSetFilteredList}
      />
    );

    // expect - используется для проверки условия.
    // screen - запрашивает элементы на экране (в виртуальном DOM).
    // getByRole -ищет элемент по роли (тут по button).
    // { name: "All" } - второй параметр getByRole. Указывает, что должно быть текстовое содержание "ALL".
    // toBeInTheDocument() - matcher, проверяет находится ли элемент в документе.
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Completed" })
    ).toBeInTheDocument();
  });

  it("shows correct number of active tasks", () => {
    render(<ControlPanel setTaskList={mockSetTaskList} />);

    // getByText() - ищет элемент с текстом "1".
    const taskCount = screen.getByText("1");
    const taskText = screen.getByText("task left");
    expect(taskCount).toBeInTheDocument();
    expect(taskText).toBeInTheDocument();
  });

  it("filters tasks correctly", () => {
    render(
      <ControlPanel
        // taskList={mockTasks}
        setTaskList={mockSetTaskList}
        // setFilteredList={mockSetFilteredList}
      />
    );

    // fireEvent - эмулирует событие. В данном примере - это клик на кнопку с текстом "Active".
    fireEvent.click(screen.getByRole("button", { name: "Active" }));
    // Ожидается, что аргумент mockSetTaskList будет вызван с конкрентым объектом. У которого статус "Active" в данном случае
    expect(mockSetTaskList).toHaveBeenCalledWith([
      { id: "1", value: "Active task", status: Status.Active },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "Completed" }));
    expect(mockSetTaskList).toHaveBeenCalledWith([
      { id: "2", value: "Completed task", status: Status.Completed },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(mockSetTaskList).toHaveBeenCalledWith(mockTasks);
  });

  it("clears completed tasks", () => {
    render(
      <ControlPanel
        // taskList={mockTasks}
        setTaskList={mockSetTaskList}
        // setFilteredList={mockSetFilteredList}
      />
    );

    fireEvent.click(screen.getByText("Clear Completed"));
    // Ожидается, что mockSetTaskList будет вызвана с массивом, в котором есть
    // хотя бы один объект с status: Status.Active.
    // Я не проверяю случай, когда в массиве нет объектов с Status.Active?
    expect(mockSetTaskList).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ status: Status.Active }),
      ])
    );
  });
});
