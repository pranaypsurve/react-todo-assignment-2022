import React, { useState, useEffect, useContext } from 'react'
import { TODO_STATUS, TODO_DISPLAY_VIEW } from '../../constants/todos'
import { Delete } from '@styled-icons/fluentui-system-filled/Delete'
import { Done } from '@styled-icons/material-outlined/Done'
import { Undo } from '@styled-icons/evaicons-solid/Undo'
import { TodoContext } from '../../contexts'
export default function TodoLists() {

    const [todoButtonAction, setTodoButtonAction] = useState(TODO_DISPLAY_VIEW.ALL)
    const [filterableTodos, setFilterableTodos] = useState([])
    const { todos, setTodos } = useContext(TodoContext)

    useEffect(() => {
        setFilterableTodos(todos);
    }, [todos])

    const markTodoDone = (id) => {
        console.log('masrk as done action', id)
        let getMarkedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, status: TODO_STATUS.COMPLETED }
            }
            return todo;
        })
        setTodos(getMarkedTodos)
    }
    const markTodoUndo = (id) => {
        console.log('undo action', id)
        let getUndoTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, status: TODO_STATUS.PENDING }
            }
            return todo;
        })
        setTodos(getUndoTodos)
    }
    const deleteTodoTask = (id) => {
        let getNewTodo = todos.filter(todo => {
            return todo.id !== id
        })
        setTodos(getNewTodo)
    }
    const completedTodos = () => {
        setTodoButtonAction(TODO_DISPLAY_VIEW.COMPLETED)
        setFilterableTodos(todos.filter(todo => {
            return todo.status === TODO_STATUS.COMPLETED
        }))
    }
    const showAllTodos = () => {
        setTodoButtonAction(TODO_DISPLAY_VIEW.ALL)
        setFilterableTodos(todos);
    }
    const showPendingTodos = () => {
        setTodoButtonAction(TODO_DISPLAY_VIEW.PENDING)
        setFilterableTodos(todos.filter(todo => {
            return todo.status === TODO_STATUS.PENDING
        }))
    }
    return (<>
        <h1 className='text-center pt-2'>Todo List</h1>
        <div className='d-flex justify-content-between my-4'>
            <button type="button" className='btn btn-primary' onClick={showAllTodos}>All</button>
            <button type="button" className='btn btn-primary' onClick={showPendingTodos}>Pending</button>
            <button type="button" className='btn btn-primary' onClick={completedTodos}>Completed</button>
        </div>
        {/* todo list */}
        {
            filterableTodos.length ? filterableTodos.map((todo) => {
                return <div key={todo.id} style={todo.status === TODO_STATUS.COMPLETED ? { backgroundColor: 'lightgrey' } : {}} className='my-2 d-flex justify-content-between align-items-center border p-2 rounded'>
                    <p className='m-0' style={todo.status !== TODO_STATUS.PENDING ? { textDecoration: 'line-through' } : {}} >{todo.taskName}</p>
                    <div className='d-flex'>
                        {
                            todoButtonAction === TODO_STATUS.COMPLETED || todoButtonAction === TODO_STATUS.PENDING ? '' : todo.status === TODO_STATUS.PENDING ? <button type='button' className='btn btn-success btn-sm' onClick={() => { markTodoDone(todo.id) }} title="Mark as done"><Done style={{ height: 30 }} /></button> : <button type='button' className='btn btn-warning btn-sm' onClick={() => { markTodoUndo(todo.id) }} title="Undo"><Undo style={{ height: 30 }} /></button>
                        }
                        &nbsp;&nbsp;
                        {
                            todoButtonAction === TODO_STATUS.COMPLETED || todoButtonAction === TODO_STATUS.PENDING ? '' : <button type='button' className='btn btn-danger btn-sm' onClick={() => deleteTodoTask(todo.id)} title="Delete Todo"><Delete style={{ height: 30 }} /> </button>
                        }
                    </div>
                </div>
            }) : 'Not Found'
        }
        {/* todo list ends */}
    </>)
}
