import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from '../ControlPanel';
import { TodoData, Status } from '../../../types/types';
import * as localStorageActions from '../../../utils/localStorageActions';

// Mock localStorage actions
jest.mock('../../../utils/localStorageActions', () => ({
  getItemFromLocalStorage: jest.fn(),
  setItemToLocalStorage: jest.fn()
}));

describe('ControlPanel Component', () => {
  const mockSetTaskList = jest.fn();
  // const mockSetFilteredList = jest.fn();
  
  const mockTasks: TodoData[] = [
    { id: '1', value: 'Active task', status: Status.Active },
    { id: '2', value: 'Completed task', status: Status.Completed },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (localStorageActions.getItemFromLocalStorage as jest.Mock).mockReturnValue(mockTasks);
  });

  it('renders all filter buttons', () => {
    render(
      <ControlPanel 
        // taskList={mockTasks} 
        setTaskList={mockSetTaskList} 
        // setFilteredList={mockSetFilteredList} 
      />
    );
    
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  });

  it('shows correct number of active tasks', () => {
    render(
      <ControlPanel 
        // taskList={mockTasks} 
        setTaskList={mockSetTaskList} 
        // setFilteredList={mockSetFilteredList}
      />
    );
    
    const taskCount = screen.getByText('1');
    const taskText = screen.getByText('task left');
    expect(taskCount).toBeInTheDocument();
    expect(taskText).toBeInTheDocument();
  });

  it('filters tasks correctly', () => {
    render(
      <ControlPanel 
        // taskList={mockTasks} 
        setTaskList={mockSetTaskList} 
        // setFilteredList={mockSetFilteredList}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(mockSetTaskList).toHaveBeenCalledWith([
      { id: '1', value: 'Active task', status: Status.Active }
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(mockSetTaskList).toHaveBeenCalledWith([
      { id: '2', value: 'Completed task', status: Status.Completed }
    ]);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(mockSetTaskList).toHaveBeenCalledWith(mockTasks);
  });

  it('clears completed tasks', () => {
    render(
      <ControlPanel 
        // taskList={mockTasks} 
        setTaskList={mockSetTaskList} 
        // setFilteredList={mockSetFilteredList}
      />
    );
    
    fireEvent.click(screen.getByText('Clear Completed'));
    expect(mockSetTaskList).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ status: Status.Active })
      ])
    );
  });
}); 