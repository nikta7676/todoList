import {useState, useEffect} from 'react';

function getStorageValue(key:string, defaultValue:Object){

    const saved:any = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue
} 

export const useLocalStorage = (key:string, defaultValue:Object)=>{
    const [value, setValue] = useState(()=>{
        return getStorageValue(key, defaultValue)
    }); 
    
    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
} //пользовательский хук на получение и отправку изменений 
