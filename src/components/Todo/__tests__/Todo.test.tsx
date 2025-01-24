import { render, screen, fireEvent, act } from '@testing-library/react';
import { Todo } from '../Todo';
// import userEvent from '@testing-library/user-event';

describe('Todo Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders todo form and empty list initially', () => {
    render(<Todo />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  it('allows adding new tasks', async () => {
    render(<Todo />);
    
    const input = screen.getByRole('textbox');
    const form = screen.getByTestId('todo-form');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'New test task' } });
      fireEvent.submit(form);
    });

    expect(screen.getByText('New test task')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Input should be cleared
  });

  it('shows correct task count', async () => {
    render(<Todo />);
    
    const input = screen.getByRole('textbox');
    const form = screen.getByTestId('todo-form');

    // Add first task
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.submit(form);
    });

    // Add second task
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.submit(form);
    });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('tasks left')).toBeInTheDocument();
  });
}); 