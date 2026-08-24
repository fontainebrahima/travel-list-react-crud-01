import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "charger", quantity: 4, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  //ajout d'un item
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  //supprime un item
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(id);
  }

  //toggle avec l'option checked
  function handleToogleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToogleItem={handleToogleItem}
      />
      <Stats items={items} />
    </div>
  );
}
//---------------------------------Logo---------------------------
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

//---------------------------------form---------------------------
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> what do you need for your 😊 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (acc, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Ajouter</button>
    </form>
  );
}
//--------------------------------- ensemble de List---------------------------
function PackingList({ items, onDeleteItem, onToogleItem }) {

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
      .sort((a, b) => Number(a.packed - b.packed));

  //---------------------------------affichage de la liste---------------------------

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToogleItem={onToogleItem}
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
      </div>

    </div>
  );
}

//-------------------------------- un element de List--------------------------
function Item({ item, onDeleteItem, onToogleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToogleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {} }>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

//-------------------------------- un element des stats--------------------------
function Stats({ items }) {
  
  if (!items.length)
    return (
      <p className="stats">
        <em>start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everyhing! ready to go✈️"
          : `🍔you have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
