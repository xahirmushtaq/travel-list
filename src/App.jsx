import { useState } from 'react'
import './App.css'
import Logo from './components/logo'
import Form from './components/form'
import Stats from './components/stats'

function App() {
    const [items, setItems] = useState([])
    function handleAddItems(item) {
        setItems((items) => [...items, item])
    }
    function handleDeleteItems(id) {
        setItems(items.filter((item) => item.id != id))
    }
    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        )
    }
    function handleClearList() {
        if (window.confirm('Are you sure you want to clear the list?')) {
            setItems([])
        }
    }

    return (
        <>
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItems}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
        </>
    )
}
export default App

// ----------------PackingList----------------
function PackingList({ items, onDeleteItems, onToggleItem, onClearList }) {
    const [sortBy, setSortBy] = useState('input')
    let sortedItems
    if (sortBy === 'input') sortedItems = items
    if (sortBy === 'description')
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description))
    if (sortBy === 'packed')
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed))

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        onDeleteItems={onDeleteItems}
                        onToggleItem={onToggleItem}
                        onClearList={onClearList}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed</option>
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    )
}

// ---------PackingList Item----------
function Item({ item, onDeleteItems, onToggleItem, onClearList }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    )
}
