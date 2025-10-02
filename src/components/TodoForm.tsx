import {useState } from "react";

type Props = {
    OnAdd: Function
}
const TodoForm=({OnAdd}:Props)=>{

    const [data, setData] = useState({
        name :'',
        active: true 
    })

   const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

        setData({
            name: e.target.value,
            active: true
             
        })
        
    } 
    
    const classError = data.name? " ": 'inputError'
    return(
        <>
            <form action=""
            onSubmit={(e)=>{
                e.preventDefault();
                OnAdd(data)
                setData({name: '',
                    active: true
                })
            }}>
            <label className={classError}>
                <input type="text" id="taskInput"  
                name="name" 
                value={data.name} 
                placeholder="Добавить задачу" 
                onChange={onChange}/>
            </label>   
                <button type="submit" id="addTask">Добавить</button>

            </form>
        
        </>
    )
}

export default TodoForm;