import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "../Todo";
import { act } from "react";
// import userEvent from '@testing-library/user-event';

describe("Todo Component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("renders todo form and empty list initially", () => {
    const { container } = render(<Todo />);
    expect(screen.getByText("Create Task")).toBeInTheDocument();
    expect(container.querySelector("ul.list-reset.list")).toBeInTheDocument();
  });

  it("allows adding new tasks", async () => {
    // container — это DOM-элемент, который является корнем рендеринга компонента
    const { container } = render(<Todo />);

    const input = screen.getByRole("textbox");
    // act - нужен для работы с асинхронными операциями или с операциями, которые могу затронуть асинхронную логику.
    // Гарантировать, что все асинхронные обновления состояния или рендеринга компонента были завершены, прежде чем тест будет продолжен.
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Task" } });
    });

    const form = container.querySelector("form.form");
    await act(async () => {
      fireEvent.submit(form!);
    });

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("shows correct task count", async () => {
    const { container } = render(<Todo />);

    const input = screen.getByRole("textbox");
    await act(async () => {
      fireEvent.change(input, { target: { value: "Task 1" } });
    });

    const form = container.querySelector("form.form");
    await act(async () => {
      fireEvent.submit(form!);
    });

    await act(async () => {
      fireEvent.change(input, { target: { value: "Task 2" } });
    });

    await act(async () => {
      fireEvent.submit(form!);
    });

    expect(screen.getByText("2")).toBeInTheDocument();
    // Регулярное выражение /tasks? left/ ищет строку, которая начинается с "task" или "tasks" 
    // (буква "s" может быть как присутствующей, так и отсутствующей). 
    // После этого должно быть слово "left".
    expect(screen.getByText(/tasks? left/)).toBeInTheDocument();
  });
});
