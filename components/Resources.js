import {useEffect, useState} from "react";

export default function Resources({ item }) {

    const [items, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [amount, setAmount] = useState(1);

    const addItemData = (i, amount) => {
        setItems(items => {
            if (items.some(existingItem => existingItem.item.id === i.id)) {
                return items;
            }
            return [...items, {item: i, amount}];
        });
        setOriginalItems(originalItems => {
            if (originalItems.some(existingItem => existingItem.item.id === i.id)) {
                return originalItems;
            }
            return [...originalItems, {item: i, amount}];
        });
    }

    useEffect(async () => {
        await getResources();
    }, [item]);

    const getResources = async () => {
        setItems([]);
        setOriginalItems([]);
        const res = await fetch(`https://api.xivtools.co/recipe/resources?item=${item.id}&amount=1`);
        let data = await res.json();
        setResources(data);
        data.map(async (resource) => {
            const i = await getItemData(resource);
            addItemData(i, resource.amount);
        });
    }

    const getItemData = async (resource) => {
        const res = await fetch(`https://api.xivtools.co/item?id=${resource.itemId}`);
        return await res.json();
    }

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        setItems(originalItems.map(item => ({
            ...item,
            amount: item.amount * newAmount
        })));
    }

    return (
        <div className="mt-5">
            <h2 className="text-white">Resources</h2>
            <div>
                <label htmlFor="amount" className="text-white">Amount: </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    min="1"
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
            </div>
            <ul className="list-none p-0">
                {items && items.map((item, index) => (
                    <li key={index} className="p-2 mb-1 bg-gray-100 border border-gray-300 rounded">{item.amount} x {item.item.name}</li>
                ))}
            </ul>
        </div>
    );
}