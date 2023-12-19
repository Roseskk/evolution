import React from 'react';
import {FoodWrapper} from "../../styles/papers.ts";
import FoodItem from "./foodItem.tsx";

//Ну тут кушаем как то так
const FoodList = ({food}: {food: number}) => {
    return (
        <FoodWrapper>
            <span>Кормовая база</span>
            {
             !!food &&  <ul>
                    {
                        [...Array(food).keys()].map((f, index) => (
                            <FoodItem key={index} />
                        ))
                    }
                </ul>
            }
        </FoodWrapper>
    );
};

export default FoodList;