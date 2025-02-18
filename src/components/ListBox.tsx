import { useState } from "react";
import { ITodoList,deleteListItem,updateListItem } from "../utils/listTools";
import { Button, ButtonGroup, Card, Col, Container, Form, Row } from "react-bootstrap";

interface ListBoxProps extends ITodoList{
    onUpdate : () => void;
}

const ListBox = ({ id, title, status, onUpdate }: ListBoxProps) => {
    const handleDelete = ()=>{
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
            if (confirmDelete) {
                deleteListItem(id);
            }
        onUpdate();
    };

    const [isEditing,setIsEditing] = useState(false);
    const [editTitle,setEditTitle] = useState(title);
    const [editStatus, setEditStatus] = useState(status);

    const handleSave = ()=>{
        const updatedTask:ITodoList = {
            id,
            title : editTitle,
            status : editStatus
        }
        setIsEditing(false);
        updateListItem(updatedTask);
        onUpdate();
    }

  return (
    <>
        <Container>
      <Row key={id} className="mb-3">
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-start">
            <div>
                {isEditing ? (
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text"
                                value = {editTitle}
                                onChange = {(e)=>setEditTitle(e.target.value)}
                                />
                        </Col>
                        <Col>
                            <Form.Select
                            value = {editStatus}
                            onChange = {(e)=>setEditStatus(e.target.value as "completed" | "pending")}
                            >
                                <option value = "completed">completed</option>
                                <option value = "pending">pending</option>
                            </Form.Select>
                        </Col>                        
                    </Row>
                ) : (
                    <>
                        <strong>{title}</strong>
                        <div className="text-muted">{status}</div>
                    </>
                )}
            </div>
            <ButtonGroup>
                {isEditing ? (
                    <>
                        <Button aria-label="Save Task" variant = "success" onClick={handleSave}>💾</Button>
                        <Button aria-label="Delete Task" variant="danger" onClick={handleDelete}>🗑️</Button>
                    </>
                ):(
                    <>
                        <Button aria-label="Edit Task" onClick={()=>setIsEditing(true)}>✏️</Button>
                        <Button aria-label="Delete Task" variant="danger" onClick={handleDelete}>🗑️</Button>
                    </>
            )}
                        
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Row>
    </Container>
    </>
);
};

export default ListBox;
