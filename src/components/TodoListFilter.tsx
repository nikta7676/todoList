import type React from 'react';
import type {Props} from '../App';


const TodoListFilter:React.JSX.ElementType = (props:Props)=>{

  const {filter,OnFilter}= props;

  const btnFilter = [
    {name:'Все', filter: 'all'},
    {name: 'Активные', filter: 'active'},
    {name: 'Выполненые', filter: 'done'}
  ]

    return(
        <div className='filters'>
          {btnFilter.map((item:any)=>{
           const activeFilter:string = item.filter === filter ? "background-yellow" : ' ';
            return(
            <button type='button'
            className={activeFilter} 
            key={item.filter} 
            onClick={()=>OnFilter(item.filter)}>{item.name}
            </button>)
          })}
        </div>
    )
}

export default TodoListFilter;