import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { ITodoList } from "../utils/listTools";
import { getList,storeList } from "../utils/listTools";

interface AddTodoProps {
    onTodoAdd : () => void;
}

const AddTodo = ({onTodoAdd}:AddTodoProps) => {
    
    const [newTask,setNewTask] = useState<ITodoList>({id:0,title:'',status:"completed"});

    const handleAddTask = () =>{
        const currentList = getList();
        const newId = currentList.length + 1;

        const taskToAdd:ITodoList = {
            id : newId,
            title : newTask.title,
            status : newTask.status as "completed" | "pending",
        }
        if(!taskToAdd.title) alert("Title cannot be empty");
        else storeList(taskToAdd);
        
        setNewTask({id:0,title : "",status:"pending"});
        onTodoAdd();
    }

    return (
        <>
        <Container>
            <InputGroup className="mb-3">
                <Form.Control 
                    id='task-title-input'
                    placeholder="Enter Task Here"
                    aria-label="Enter Task Here"
                    value={newTask.title}
                    onChange={(e)=>{
                        setNewTask({...newTask,title:e.target.value});
                    }}
                />
                <Form.Select id="task-status-select" aria-label='Select Status' value={newTask.status} onChange={(e)=>{
                    setNewTask({...newTask, status: (e.target.value==="completed")?"completed":"pending"})
                }}>
                    <option value='pending'>pending</option>
                    <option value='completed'>completed</option>
                </Form.Select>
                <Button variant="outline-secondary" id='add-task-button' onClick={handleAddTask}>Add</Button>
            </InputGroup>
        </Container>
        </>
    );
};

export default AddTodo;
