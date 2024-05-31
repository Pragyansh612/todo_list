import React from 'react'
import{ useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Home = () => {
  const [task, setTask] = useState('');
  const [savedTask, setSavedTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [checked, setChecked] = useState({});
  const [checked2, setChecked2] = useState(false);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleSaveTask = () => {
    if (task.trim() !== '') {
      setSavedTask([...savedTask, task]);
      setTask('');
      savetodo()
    }
  };

  const deleteTask = (index) => {
    const newTaskList = [...savedTask];
    newTaskList.splice(index, 1);
    setSavedTask(newTaskList);
    localStorage.setItem("savedTask", JSON.stringify(newTaskList));
  };

  const handleEditing = (index) => {
    setEditing(true);
    setEditingIndex(index);
  };

  const setUpdate = (updatedTask, index) => {
    const newTaskList = [...savedTask];
    newTaskList[index] = updatedTask;
    setSavedTask(newTaskList);
    localStorage.setItem("savedTask", JSON.stringify(newTaskList));
  };

  useEffect(() => {
    const tasks = localStorage.getItem("savedTask");
    if (tasks) {
      setSavedTask(JSON.parse(tasks));
    }}, []);
  
  const savetodo = () => {
    localStorage.setItem("savedTask", JSON.stringify(savedTask));
  };

  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };

  const handleCheckboxChange = (index) => {
    setChecked({
      ...checked,
      [index]: !checked[index]
    });
  };

  const finishtask = () => {
    setChecked2(!checked2)
  }
  return (
    <div className="con flex justify-center w-3/5 mx-auto my-5 bg-purple-300 rounded-xl">
        <div>
          <h1 className='con m-2 font-semibold text-4xl text-center'>ITask - A Place To Manage Your Tasks</h1>
          <div className='m-8 flex flex-col'>
            <div className='text-2xl font-medium'>ADD a TODO</div>
            <div>
              <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                className='w-10/12 py-2 rounded-2xl text-center'
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleSaveTask();
                  savetodo()
                }}
              />
              <button
                className='m-2 w-14 bg-purple-600 rounded-full p-2 text-center text-white hover:bg-purple-800'
                onClick={handleSaveTask}
              >
                Save
              </button>
            </div>
            <div>
              <div className='flex gap-4 my-3'>
                <input
                  type="checkbox"
                  onChange={finishtask}
                />
                <h4 className='font-sans font-medium'>Show Finished TODOS</h4>
              </div>
              <div>
                {checked2 && <div>
                  {Object.keys(checked).length > 0 && (
                    <div className='m-2 flex flex-col'>
                      {savedTask.map((savedTaskItem, index) => (
                        checked[index] && (
                          <div key={index} className='flex justify-between'>
                            <div className=' my-2'>{savedTaskItem}</div>
                            <div>
                              <button className='w-6 bg-purple-600 rounded-full p-1 hover:bg-purple-800' onClick={() => deleteTask(index)}>
                                <MdDelete className=' fill-white' />
                              </button>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>}
              </div>
              <h1 className="font-medium text-xl">Your Todos</h1>
              {savedTask.length === 0 && <div className='text-center font-medium font-sans text-xl my-2'>No TODOS To Show</div>}
              <div className='m-2 flex flex-col'>
                {savedTask.map((savedTaskItem, index) => (
                  <div key={index} className='my-2'>
                    <div>
                      {index === editingIndex && editing ? (
                        <div className='flex gap-4 justify-between'>
                          <input
                            type="text"
                            value={savedTaskItem}
                            onChange={(e) => setUpdate(e.target.value, index)}
                            autoFocus
                            onKeyDown={handleUpdatedDone}
                            className='rounded-full text-center'
                          />
                          <button className='w-6 bg-purple-600 rounded-full p-1 hover:bg-purple-800' onClick={() => deleteTask(index)}>
                            <MdDelete className=' fill-white' />
                          </button>
                        </div>
                      ) : (
                        <div>
                          {!checked[index] && (
                            <div className='flex justify-between'>
                              <div className='flex gap-5'>
                                <input
                                  type="checkbox"
                                  checked={checked[index] || false}
                                  onChange={() => handleCheckboxChange(index)}
                                />
                                {savedTaskItem}
                              </div>
                              <div className='flex gap-4'>
                                <button className='w-6 bg-purple-600 rounded-full p-1 hover:bg-purple-800' onClick={() => handleEditing(index)}>
                                  <MdEdit className=' fill-white' />
                                </button>
                                <button className='w-6 bg-purple-600 rounded-full p-1 hover:bg-purple-800' onClick={() => deleteTask(index)}>
                                  <MdDelete className=' fill-white' />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


export default Home
