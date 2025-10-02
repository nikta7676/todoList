import type React from "react";
import TodoListItem from "./TodoListItem";
import type { Props } from "../App";

const TodoList:React.JSX.ElementType = (props:Props) =>{

    const {data , OnChek, OnDelete,onAddNewTask,filter} = props
    const elem = data.map((item:any)=>{
        const {id, ...itemProps} = item
         return(<TodoListItem 
            key ={id} 
            id={id} 
            onAddNewTask={onAddNewTask}  
            OnChek={()=>OnChek(id)} 
            OnDelete={()=>OnDelete(id)} 
            {...itemProps}></TodoListItem>)
        })
    const zeroTask = ()=>{
        if(filter === 'all'){
            return <li>У вас нет задач</li>
        }else{
           return <li>Таких задач нет</li>
        }
    } // изменение надписи где именно нет тасков
    return(
        <ul>
            {data.length === 0 ? zeroTask() : elem}
        </ul>
         
    )
}

export default TodoList;