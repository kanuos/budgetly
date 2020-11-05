const list = [];

export function addEntry(entry){
    console.log(`Item added : `, entry);
    list.push(entry);
}

export function deleteEntry(entry){
    console.log(`Item deleted : `, entry);
}

export function editEntry(entry){
    console.log(`Item edited : `, entry);
}

