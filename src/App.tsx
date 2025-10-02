import React, {useState} from 'react';
import { useLocalStorage } from './components/useLocalStorage';
import TodoList from './components/TodoList';
import TodolistFilter from './components/TodoListFilter';
import TodoForm from './components/TodoForm';
import './App.css';

export type Props = {
    data: Object[],
    filter: string
    name: string,
    OnChek:React.MouseEventHandler<HTMLButtonElement>,
    active?: boolean,
    OnDelete:React.MouseEventHandler<HTMLButtonElement>,
    onAddNewTask:Function,
    id: number,
    OnFilter: Function
  }
export type ItemType ={
    name: string,
    active: boolean,
    id: number,
    filter: string
  }

function App():React.JSX.Element{

  const [data, setData] = useLocalStorage('arr', [])
  const [filter,setFilter]= useState('all');
  let MaxId = data.length;
  
  type FunctionTypes = (state: ItemType) => void;

  const UpdateLocalStorage = (data:object[])=>{

        let arr = data.map((item,id)=>{
          return({...item, id})
        })
        setData(arr, [ ])
  }// Структуровние данных 

  const OnAdd:FunctionTypes = (state:ItemType) =>{
    const newTask = {
      ...state,
      id:MaxId++
    }
    if(newTask.name.length > 0){
      UpdateLocalStorage([...data, newTask])
    }; 
  }// добавление новых тасков

  
  const OnChek:Function = (id:number)=>{

    let arr = data.map((item:ItemType)=>{
        if(item.id === id){
          return {...item, active: !item.active}
        }else{
          return item
        }})
    UpdateLocalStorage(arr)
  } // отметка таска как выполнено

  const OnDelete:Function = (id:number)=>{
    UpdateLocalStorage(data.filter((item:ItemType)=> item.id !== id))
  } // Удаление таска

  const OnFilter:Function = (filter:string)=>{
      setFilter(filter)
  } 
  
  const onCorrectFilter:Function =(data:ItemType[],filter:string)=>{
        let arr;
        switch(filter){
          case 'all':
            arr = data
            break
          case 'active':
            arr = data.filter((item:ItemType)=> item.active)
            break
          case 'done':
            arr = data.filter((item:ItemType)=> !item.active)
            break
        }
        return arr
      } // Отображение задачи в соотвествии с фильтром


   const onAddNewTask = (id:number, taskName:string) =>{
      const editArr = taskName ? data.map((item:ItemType)=>{
        if(item.id === id){
          return({...item, name: taskName})
        }else{
          return item
        }
      }): data
      setData(editArr, [ ])
   } // добавление  отредактированного Таска

   const form = onCorrectFilter(data,filter);
   const length = data.filter((item:ItemType)=>!item.active).length 
   // Отображение сколько выполнено задач

return (
    <div>
      <div className="container">
        <h1>Список дел</h1>
        <TodolistFilter filter={filter}  OnFilter={OnFilter}/>
        <TodoForm OnAdd={OnAdd}/>
        <TodoList data={form} 
        filter={filter} 
        onAddNewTask={onAddNewTask} 
        OnChek={OnChek} 
        OnDelete={OnDelete}></TodoList>
        <h1>Выполнено задач {length}</h1>
      </div>
    </div>

  )
}
  
   
export default App
