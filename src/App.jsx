import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "./index.css"
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  useEffect(() => {
    let to1 = JSON.parse(localStorage.getItem("todos"));
    if (to1 === null) {
      settodos([])
      localStorage.setItem("todos", JSON.stringify(todos));

    }
    else {
      settodos(to1)
    }
  }, [])

  const storage = (e) => {
    localStorage.setItem("todos", JSON.stringify(e || todos));
  }
  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo)
    storage();
    handledelete(e, id)


  }
  const handledelete = (a, id) => {
    let newtodo = todos.filter(e => {
      return e.id !== id;
    })
    settodos(newtodo);
    storage(newtodo);



  }
  const handleadd = () => {
    if (todo !== "") {
      settodos(prevTodos => {
        const newTodos = [...prevTodos, { id: uuidv4(), todo, iscomplete: false }];
        storage(newTodos);
        return newTodos;
      });
      settodo("");
    }
  };
  const handlechange = (e) => {
    settodo(e.target.value)

  }

  const handlecheck = (e) => {
    let id = e.target.id;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newtodo = [...todos];
    newtodo[index].iscomplete = !newtodo[index].iscomplete;
    settodos(newtodo);
    storage();

  }

  return (
    < >
      <Navbar />
      <div className="font-roboto container mx-auto bg-slate-100 mt-10 rounded-xl p-5 min-h-[80vh]">
        <h1 className='font-bold text-2xl'>Add a todo</h1>
        <div className="addtodo my-9 flex flex-col gap-5 sm:flex-row">
          <input onChange={handlechange} value={todo} className='bg-white w-full  py-2 rounded-xl border-none outline-none text-[18px] sm:mx-8 sm:w-7/12 px-6' type="text" name='name' placeholder='Write todo here' />
          <button onClick={handleadd} className='bg-slate-800 text-white px-5 py-2 rounded-lg hover:bg-slate-900 w-1/4 mx-auto sm:w-fit'>Add</button>
        </div>
        <h2 className='font-bold text-lg my-4'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='text-lg font-[400] m-2'>No todos to display</div>}
          {todos.map(item => {

            return <div key={item.id} className="todo flex justify-between items-center m-5">
              <div className={`text font-[500] text-lg flex gap-4 items-center ${item.iscomplete ? "line-through" : ""}`} >
                <input onChange={handlecheck} type="checkbox" checked={item.iscomplete} name="check" id={item.id} />

                {item.todo}
              </div>
              <div className="buttons flex gap-5">
                <button onClick={(e) => { handleedit(e, item.id) }} className='bg-purple-800 text-white px-5 py-2 rounded-lg hover:bg-purple-900'><FaEdit /></button>
                <button onClick={(a) => { handledelete(a, item.id) }} className='bg-purple-800 text-white px-5 py-2 rounded-lg hover:bg-purple-900'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
