"use client";

import {useState} from "react";
import Search from "@/components/Search";
import Resources from "@/components/Resources";

export default function Page() {

    const [currentItem, setCurrentItem] = useState(null);

    const handleSelectedItem = async (id) => {
        setCurrentItem(await getItems(id));
    }

    const getItems = async (id) => {
        const res = await fetch(`https://api.xivtools.co/item?id=${id}`);
        return await res.json();
    }

    return (
        <div className="p-5 w-full h-full fixed text-black bg-black">
            <div className="flex justify-between w-[calc(50%)]">
                <div>
                    <Search handleSelectedItem={handleSelectedItem}/>
                </div>
                <div className="w-[calc(50%)]">
                    {currentItem && (
                        <div className="mt-5 p-5 border border-gray-300 rounded bg-black">
                            <span className="text-white flex gap-3"><p className="font-bold">Selected Item: </p>{currentItem.name}</span>
                            <span className="text-white flex gap-3"><p className="font-bold">Description: </p>{currentItem.description}</span>
                            <Resources key={currentItem.id} item={currentItem}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}