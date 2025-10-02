import { useState } from "react";
import type {Props}  from "../App";

const TodoListItem:React.JSX.ElementType=(props:Props)=>{
    const [edit, setEdit] = useState(false) // отслеживание нажата ли кнопка редакт
    const {name,OnChek,active,OnDelete,onAddNewTask,id} = props
    const classComplete = active? ' ' : "yellow";
    const [newTask, setNewTask] = useState(name)

   const onChangeTaskItem = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewTask(e.target.value)
        
    }  // отслеживание изменений в редактирании таска


    const classError = newTask? " ": 'inputError' 
    const inputEdit =
    <li className={`{classNameItem} editForm`}>
            <form
                    onSubmit={(e)=>{
                        e.preventDefault();
                        onAddNewTask(id, newTask);
                        setEdit(!edit);//Отправка изменений и возврат к режиму чтения таска
                        }}>
                <label className={classError}>
                        <input type="text" 
                        id="taskEditItem" 
                        className={classError} 
                        name="name" 
                        value={newTask} 
                        placeholder={name} 
                        onChange={onChangeTaskItem}/>
                </label>
                
                <div className="icons">
                    <button disabled
                    type="button"
                    >
                            <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button 
                    type="submit"
                    >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button disabled  type="button">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        
        </li> //отображение компонента с возможностью редактирования таска
    
   
    const onChangeEdit = ()=>{
        setEdit((edit)=> !edit) 
        setNewTask(name)
    }  // Включение режима редактирования


    const li = ()=>{
        if(edit){
            return inputEdit
        }else{
        return (
        <li className={classComplete}>
        {name}
        <div className="icons">
            <button 
            type="button"
            onClick={OnChek}
            >
                    <i className="fa fa-check" aria-hidden="true"></i>
            </button>
            <button type="button"
            onClick={onChangeEdit}
            >
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button  type="button"
                onClick={OnDelete}
            >
                 <i className="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
    </li>
            )
        }
    }
    return(
        <>
            {li()}
        </>
        // в зависимости от нажатия кнопки редактирования будет отображен один из компонентов
     )
           
    
}

export default TodoListItem