import React, { useState } from 'react'

function form({ onAddItems }) {
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(e) {
        e.preventDefault()

        if (!description) return //this won't console log the data if the description is empty.//
        console.log(description, quantity)

        const newItem = { description, quantity, packed: false, id: Date.now() }
        console.log(newItem)

        onAddItems(newItem)
        setDescription('') //this will clear the input box after submitting the data.//
        setQuantity(1) //this will clear the input box after submitting the data.//
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
                {/* <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option> */}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    )
}

export default form
