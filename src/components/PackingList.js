import { useState } from "react";
import  Item  from "./Item";

//-------ensemble de List---------------------------
export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {

    //fonction pour trier les items selon l'option choisie
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;
    if (sortBy === "input") sortedItems = items;

    if (sortBy === "description")
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === "packed")
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));

    //-----affichage de la liste---------------------------
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        onClearList={onClearList}
                        key={item.id} 
                    />
                ))}
            </ul>
            {/* ---------------------------------affichage du select pour trier--------------------------- */}
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">sort by input</option>
                    <option value="description">sort by description</option>
                    <option value="packed">sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>

        </div>
    );
}
