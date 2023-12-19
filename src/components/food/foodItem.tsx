import React from 'react';
import {useDrag} from "react-dnd";

const FoodItem = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'food',
        item: { type: 'food' }, // Указываем type здесь
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {/* содержимое элемента */}
        </li>
    );
};


export default FoodItem;