import { useState, useEffect } from "react";
import { ITodoList,getList } from "../utils/listTools";
import { Container } from "react-bootstrap";
import ListBox from "./ListBox";
import AddTodo from "./AddTodo";
const ListMain = () => {
    const handleUpdate =()=>{
        const newData = getList();
        setToDoList(newData);
    }
    const [todoList,setToDoList] = useState<ITodoList[]>([]); 
    useEffect(()=>{
        const list = getList();
        setToDoList(list);
    },[]);

    return (
        <>
            <Container>
                <h1>To Do list App</h1>
                <br />
                <AddTodo onTodoAdd={handleUpdate}/>
                {todoList.map((item)=>(
                    <ListBox onUpdate={handleUpdate} key = {item.id} {...item} />
                ))}
            </Container>
        </>
    );
};

export default ListMain;
