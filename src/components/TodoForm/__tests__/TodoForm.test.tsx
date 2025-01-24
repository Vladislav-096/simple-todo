import { render, screen, fireEvent, act } from '@testing-library/react';
import { TodoForm } from '../TodoForm';
import * as localStorageActions from '../../../utils/localStorageActions';
import { TodoData, Status } from '../../../types/types';

// Mock the ID generator
jest.mock('../../../utils/generateId', () => ({
  generateId: jest.fn(() => 'mocked-id')
}));

// Mock localStorage actions
jest.mock('../../../utils/localStorageActions', () => ({
  getItemFromLocalStorage: jest.fn(),
  setItemToLocalStorage: jest.fn()
}));

describe('TodoForm', () => {
  const mockSetTaskList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with input and submit button', () => {
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    expect(screen.getByText('Create Task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    expect(input).toHaveValue('New Task');
  });

  it('shows error message when submitting empty form', async () => {
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    const submitButton = screen.getByRole('button', { name: 'Add Task' });
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('Field must be filled')).toBeInTheDocument();
  });

  it('successfully submits form and updates task list', async () => {
    (localStorageActions.getItemFromLocalStorage as jest.Mock).mockReturnValue(null);
    
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
    });
    
    const form = screen.getByTestId('todo-form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockSetTaskList).toHaveBeenCalled();
    const setTaskListCallback = mockSetTaskList.mock.calls[0][0];
    const previousState: TodoData[] = [];
    const newState = setTaskListCallback(previousState);
    expect(newState).toEqual([{
      id: 'mocked-id',
      value: 'New Task',
      status: Status.Active
    }]);
    
    expect(localStorageActions.getItemFromLocalStorage).toHaveBeenCalled();
    expect(localStorageActions.setItemToLocalStorage).toHaveBeenCalledWith([{
      id: 'mocked-id',
      value: 'New Task',
      status: Status.Active
    }]);

    expect(input).toHaveValue('');
  });

  it('appends new task to existing tasks in localStorage', async () => {
    const existingTasks = [{
      id: 'existing-id',
      value: 'Existing Task',
      status: 'ACTIVE'
    }];
    (localStorageActions.getItemFromLocalStorage as jest.Mock).mockReturnValue(existingTasks);
    
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    const input = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Task' } });
    });
    
    const form = screen.getByTestId('todo-form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(localStorageActions.setItemToLocalStorage).toHaveBeenCalledWith([
      ...existingTasks,
      {
        id: 'mocked-id',
        value: 'New Task',
        status: Status.Active
      }
    ]);
  });

  it('handles focus and blur events', () => {
    render(<TodoForm setTaskList={mockSetTaskList} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.focus(input);
    // Add test for focused state
    expect(screen.getByText('Create Task').parentElement?.parentElement)
      .toHaveClass('form-field');
    
    fireEvent.blur(input);
    // Add test for blurred state
    expect(screen.getByText('Create Task').parentElement?.parentElement)
      .toHaveClass('form-field');
  });
}); 