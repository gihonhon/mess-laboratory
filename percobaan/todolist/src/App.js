import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck, faSquare} from '@fortawesome/free-regular-svg-icons'
import dataTask from './tasksData.json'

import './App.css';


function App() {

  const [toDo, setTodo] = useState(dataTask)
  const [newTask, setNewTask] = useState('')
  const [updateData, setUpdateData] = useState('')
  const [filterSearch, setFilterSearch] = useState('')


  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1
      let newEntry = {id: num, task: newTask, complete: false}
      setTodo([...toDo, newEntry])
      setNewTask('')
    }
  }

  const deleteTask = (id) => {
    //
    let newTask = toDo.filter( dataTask => dataTask.id !== id)
    setTodo(newTask)
  }

  const markDone = (id) => {
    //
    const newTask = toDo.map( dataTask => {
      if( dataTask.id === id) {
        return ({...dataTask, complete: !dataTask.complete})
      }
      return dataTask
    })
    setTodo(newTask)
  }

  const filterDone = () => {
    const data = dataTask.filter((toDo) => {
      return toDo.complete === true
    })
    setTodo(data)
  }

  const filterTodo = () => {
    const data = dataTask.filter((toDo) => {
      return toDo.complete === false
    })
    setTodo(data)
  }

  const searchFilter = () => {
    const data = dataTask.filter((toDo) => {
      if(filterSearch === "") {
        return toDo
      } else if (toDo.task.toLocaleLowerCase().includes(filterSearch.toLocaleLowerCase())) {
        return toDo
      }
    })
    setTodo(data)
  }

  const cancelUpdate = () => {
    setUpdateData('')
  }

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      task: e.target.value,
      complete: updateData.complete ? true : false
    }
    setUpdateData(newEntry)
  }

  const updateTask = () => {
    let filterRecords = [...toDo].filter(dataTask => dataTask.id !== updateData.id)
    let updatedObject = [...filterRecords, updateData]
    setTodo(updatedObject)
    setUpdateData('')
  }


  return (
    <div className="container App">

      <br></br>
      <h2>Todo Input</h2>
      <br></br>

      <div className='row'>
        <div className='col'>
          <input 
          placeholder='Search Todo. . .'
          onChange={ (e) => setFilterSearch(e.target.value)}
          className='form-control form-control-lg'></input>
        </div>

        <div className='col-auto'>
          <button 
          onClick={searchFilter}
          className='btn btn-info btn-lg'>Search</button>
        </div>
      </div>

      <br></br>

      {updateData && updateData ? (
        <>
          <div className='row'>
            <div className='col mt-3'>
              <input 
              value={ updateData && updateData.task }
              onChange={ (e) => changeTask(e)}
              className='form-control form-control-lg'/>
            </div>
            <div className='col'>
              <button 
              onClick={updateTask}
              className='btn btn-success btn-lg mr-20'>Update</button>
              <button 
              className='btn btn-warning btn-lg'
              onClick={cancelUpdate}
              >Cancel</button>
            </div>
          </div>
          <br/>
        </>
      ) : (
        <>
          <div className='row'>
            <div className='col'>
              <input
              placeholder='Input/Edit todo'
              value={newTask}
              onChange={ (e) => setNewTask(e.target.value)} 
              className='form-control form-control-lg'></input>
            </div>

            <div className='col-auto'>
              <button 
              onClick={addTask}
              className='btn btn-info btn-lg'>Add Task</button>
            </div>
          </div>
        </>

      )}

      <br></br>
      <h2>TodoList</h2>
      <br></br>

      {/* Filter Button */}
      <div className='row'>
        <div className='col'>
          <button 
          type='button'
          onClick={ () => setTodo(dataTask)}
          className='btn btn-info btn-block '>All</button>
        </div>

        <div className='col'>
          <button 
          type='button'
          onClick={filterDone}
          className='btn btn-info btn-block '>Done</button>
        </div>

        <div className='col'>
          <button
          type='button'
          onClick={filterTodo}
          className='btn btn-info btn-block'
          >
            Todo</button>
        </div>
        
      </div>


      {toDo && toDo.length ? '' : "No Tasks..."}

      {toDo && toDo.sort((a, b) => a.id > b.id ? 1 : -1
      ).map( (taskData) => {
        return(
          <React.Fragment key={taskData.id}>

            <div className='col taskBg'>
              <div className={taskData.complete ? 'done' : ''}>
              <span className='taskText'>{taskData.task}</span>
              </div>

              <div className='iconsWrap'>
                <span 
                className='check' 
                title='Mark Todo'
                onClick={ (e) => markDone(taskData.id)}>
                  {taskData.complete ? <span className='markDone'><FontAwesomeIcon icon={faSquareCheck}/></span> : <span className='notDone'><FontAwesomeIcon icon={faSquare}/></span>}
                  </span>

                  <span 
                  className='pen' 
                  title='Edit'
                  onClick={ () => setUpdateData({
                    id: taskData.id,
                    task: taskData.task,
                    complete: taskData.complete ? true : false
                    })}>
                  <FontAwesomeIcon icon={faPen}/>
                  </span>

                
                <span 
                className='trash' 
                title='Delete Todo'
                onClick={() => deleteTask(taskData.id)}>
                <FontAwesomeIcon icon={faTrash}/>
                </span>
              </div>
            </div>

          </React.Fragment>
        )
      })}


    </div>
  );
}

export default App;
