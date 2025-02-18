export interface ITodoList {
    id:number;
    title:string;
    status:"completed"|"pending";
}



export const getList =():ITodoList[]=>{
    const data = localStorage.getItem('todoListReact')
    return data ? JSON.parse(data) : [];
}

export const storeList =(data:ITodoList):void=>{
    const currentList = getList();
    currentList.push(data);
    localStorage.setItem('todoListReact',JSON.stringify(currentList));
    console.log("New Task Stored");
}

export const updateListItem = (data:ITodoList):void=>{
    const updatedData = getList().map((item:ITodoList)=>{
        return item.id===data.id ? {...data} : item;
    });
    localStorage.setItem('todoListReact',JSON.stringify(updatedData));
}

export const deleteListItem = (id:number):void=>{
    const updatedData = getList().filter((item)=>item.id !== id);
    localStorage.setItem('todoListReact',JSON.stringify(updatedData));
}
