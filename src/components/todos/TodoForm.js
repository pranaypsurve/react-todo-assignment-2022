import React, { useState, useContext } from 'react'
import { TODO_STATUS } from '../../constants/todos'
import { TodoContext } from '../../contexts'
export default function TodoForm() {

    const [todoInputError, setTodoInputError] = useState(null);
    const [todoInput, setTodoInput] = useState({
        taskName: '',
        status: TODO_STATUS.PENDING,
    });
    const { todos, setTodos } = useContext(TodoContext)
    console.log(todos)

    const addTodos = (e) => {
        e.preventDefault();
        if (todoInput.taskName.trim().length > 0) {
            setTodoInputError('')
            setTodos([...todos, {
                id: todos.length + 1,
                taskName: todoInput.taskName,
                status: TODO_STATUS.PENDING,
            }])
            setTodoInput({ ...todoInput, taskName: '' })
        } else {
            setTodoInputError('Please fill')
        }
    }
    const handleTodoInput = (e) => {
        setTodoInput({ ...todoInput, [e.target.name]: e.target.value })
    }
    return (
        <form className='' onSubmit={addTodos}>
            <input type='text' name='taskName' className='form-control' placeholder='Add new task here' value={todoInput.taskName} onChange={handleTodoInput} required />
            <p className='text-danger ps-2 m-0'>{todoInputError}</p>
            <div className='d-grid gap-2 my-2'>
                <button type="submit" className='btn btn-primary'>Add new Task</button>
            </div>
        </form>
    )
}
