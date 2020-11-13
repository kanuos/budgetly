let entries = [];

export function addEntry(entry, editMode=null){
    if (editMode) {
        entries = [...entries.map(el => {
            if (el.id === entry.id)
                return entry;
            return el;
        })]
    }
    else {
        entries.push(entry);
    }
    entries.sort((a,b) => a.stamp - b.stamp)
    return entries;
}

export function deleteEntry(id){
    entries = [...entries.filter(el => el.id !== id)] 
    return entries;
}

export function editEntry(id){
    let editable = entries.find(el => el.id === id) 
    return editable;
}

