import React from 'react'
import TodoForm from './TodoForm'
import TodoLists from './TodoLists'
function Todos() {
    return (
        <section className='py-4'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 border p-4 rounded'>
                        <TodoForm />
                    </div>
                    <div className='col-md-12'>
                        <TodoLists />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Todos