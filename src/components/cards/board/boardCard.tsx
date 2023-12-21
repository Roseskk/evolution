import React, {useRef} from 'react';
import styled from 'styled-components';
import {Card, ICard} from "../../../types/gameType.ts";
import {useDrag, useDrop} from "react-dnd";
import socket from "../../../api/ws/socket.ts";
import BoardPropertyCards from "./properties/boardPropertyCards.tsx";

// Стили для карточек
const CardWrapper = styled.div`
  width: 100px;
  height: 150px;
  background-color: green;
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: visible;
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    
    width: 5px;
    height: 5px;
    
    background-color: red;
    border-radius: 50%;
  }
`;

const BoardCard = ({card, position, playerId}: {card: ICard, position: string, playerId: string}) => {
    const ref = useRef(null);

    const [, drag] = useDrag({
        type: 'boardCard',
        item: { cardAttack: card.id, type: 'boardCard' },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: ['card', 'food', 'boardCard'], // Принимаем элементы типа 'card' и 'food'
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return;

            // Определение типа элемента и выполнение соответствующего действия
            if (item.type === 'card') {
                console.log(item)
                // Логика обработки для карточек
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: card.id, pass: false,
                    propertyCardId: item.card
                });
            } else if (item.type === 'food') {
                console.log('еда')
                // Логика обработки для еды
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: card.id,
                    pass: false,
                    foodTakes: 1
                });
            } else  if (item.type === 'boardCard') {
                console.log('card',item.cardAttack, 'attackedCard', card.id)
                if (item.cardAttack === card.id) {
                    return;
                }
                socket.emit('playerAction', {
                    lobbyId: localStorage.getItem('lobby'),
                    playerId: localStorage.getItem('name'),
                    cardId: item.cardAttack,
                    cardAttack: card.id,
                    pass: false
                })
            }
        }
    });


    drag(drop(ref));

    return (
        <CardWrapper ref={ref}>
            <span className={`${playerId === localStorage.getItem('name')! ? playerId : ''}`} >
                {
                    card.isAnimal
                    ? <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="50" height="50" viewBox="0 0 640.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="white" stroke="none">
                                <path d="M3557 12786 c-47 -17 -62 -29 -100 -85 -39 -58 -43 -61 -95 -61 -73 0 -125 -33 -167 -105 -10 -17 -14 -16 -52 12 -23 16 -63 38 -89 48 l-47 18 -19 -23 c-21 -26 -23 -62 -6 -93 16 -31 37 -45 86 -58 23 -6 45 -15 48 -20 3 -5 -20 -25 -51 -44 -51 -33 -74 -59 -63 -70 2 -2 46 -9 98 -15 120 -14 138 -18 149 -39 8 -15 16 -83 36 -329 l6 -63 -43 -37 c-60 -53 -112 -109 -155 -168 -58 -80 -92 -98 -186 -103 l-79 -3 -46 50 c-26 27 -85 112 -132 187 -102 165 -165 228 -283 284 -70 34 -91 50 -142 111 -62 74 -99 107 -150 132 -31 16 -159 43 -257 54 -50 5 -61 11 -92 45 -62 70 -138 84 -218 43 -25 -13 -40 -13 -103 -3 -42 6 -125 10 -192 7 -164 -6 -238 -40 -284 -130 -46 -89 -4 -253 117 -459 38 -66 44 -83 44 -133 0 -90 40 -144 121 -166 48 -13 73 -45 136 -175 57 -118 115 -183 188 -210 28 -10 77 -29 110 -42 33 -14 127 -49 209 -79 193 -69 406 -194 406 -238 0 -7 -12 -41 -27 -77 -25 -59 -28 -75 -28 -197 0 -122 -2 -135 -20 -148 -28 -22 -71 -10 -116 30 -62 57 -104 64 -218 37 -53 -13 -102 -25 -108 -27 -26 -7 -12 -30 35 -57 26 -15 62 -39 81 -52 41 -30 91 -45 151 -45 59 0 90 -21 90 -63 0 -28 -15 -47 -120 -148 -115 -112 -136 -139 -107 -139 8 0 19 -11 25 -25 23 -51 95 -21 161 69 46 62 62 69 147 69 50 0 73 -7 133 -38 142 -74 172 -49 231 187 40 157 43 162 75 123 31 -38 158 -286 224 -437 96 -223 130 -338 156 -540 35 -277 79 -449 144 -573 40 -77 65 -198 56 -271 -3 -30 -10 -54 -14 -54 -5 0 -38 20 -75 44 -80 54 -361 193 -413 204 -51 11 -97 0 -146 -34 -65 -46 -101 -110 -157 -278 -52 -157 -84 -221 -110 -221 -12 0 -15 17 -16 76 -2 86 -14 112 -73 153 -52 36 -75 34 -95 -9 -15 -31 -16 -44 -5 -93 6 -31 24 -86 40 -121 37 -82 48 -141 26 -141 -15 0 -109 69 -122 90 -4 6 -25 25 -47 41 -46 33 -105 38 -148 14 -14 -8 -38 -15 -55 -15 -62 -1 -64 -12 -20 -96 22 -42 59 -97 81 -123 38 -42 48 -47 125 -65 92 -21 129 -39 129 -62 0 -41 -109 -138 -190 -170 -71 -27 -97 -50 -125 -109 -17 -38 -38 -64 -66 -82 -39 -26 -56 -59 -45 -88 12 -33 180 -8 255 37 20 12 70 54 112 94 84 81 109 94 176 94 102 0 163 -84 163 -224 0 -83 17 -173 45 -243 16 -41 53 -67 79 -57 20 8 98 250 90 278 -3 11 -21 44 -39 71 -18 28 -40 73 -49 101 l-17 51 59 60 c64 66 107 131 173 266 24 48 49 87 55 87 14 0 110 -106 199 -219 32 -40 71 -81 87 -90 16 -9 31 -27 35 -41 4 -14 -1 -117 -11 -230 -9 -113 -24 -286 -33 -385 -18 -217 -13 -451 17 -705 57 -486 160 -895 361 -1434 116 -311 164 -423 322 -751 231 -481 315 -679 406 -951 101 -306 132 -472 138 -754 6 -236 -7 -383 -52 -608 -68 -333 -225 -643 -447 -877 -108 -114 -135 -136 -571 -467 -237 -181 -347 -271 -406 -335 -101 -107 -104 -129 -20 -127 46 1 68 8 115 36 98 59 241 127 405 193 201 81 340 151 448 225 288 198 551 520 741 905 116 236 158 372 192 625 16 124 16 491 -1 650 -51 491 -188 1037 -469 1870 -49 146 -104 312 -122 370 -17 58 -49 159 -70 225 -68 212 -117 447 -152 730 -17 134 -13 401 9 545 13 83 18 177 18 335 l0 220 33 111 c41 135 45 143 69 127 67 -47 177 -106 295 -158 75 -34 144 -68 154 -75 23 -20 15 -110 -27 -301 -23 -105 -31 -171 -32 -244 0 -116 10 -173 65 -345 27 -87 47 -177 63 -295 30 -211 37 -237 82 -286 50 -56 84 -73 109 -54 19 13 18 15 -3 78 -21 59 -21 67 -8 94 8 16 17 54 21 86 6 51 4 63 -26 120 -30 59 -31 66 -19 92 22 44 41 51 91 34 50 -16 127 -90 212 -203 31 -41 69 -84 84 -95 16 -11 70 -31 122 -46 52 -15 103 -31 113 -37 14 -7 23 -6 34 5 13 13 13 17 0 38 -8 13 -18 45 -21 70 -10 66 -53 126 -164 227 -156 142 -154 139 -150 169 7 60 129 122 303 153 55 10 108 22 117 25 27 11 31 37 8 65 -11 14 -29 42 -40 63 l-20 37 -68 0 c-43 0 -94 -9 -143 -24 -64 -20 -128 -31 -162 -27 -4 1 15 31 43 67 100 130 121 200 75 247 -58 57 -111 40 -183 -60 l-47 -65 -3 66 c-2 51 7 110 38 244 53 227 52 271 -8 397 -51 106 -106 184 -197 283 -72 78 -258 236 -368 315 -37 26 -72 58 -77 72 -14 36 6 232 35 360 64 275 86 394 95 523 27 373 -56 764 -244 1157 -115 239 -231 411 -390 577 -107 110 -140 157 -209 295 -26 50 -69 130 -97 178 -73 122 -90 163 -90 218 0 88 45 145 191 245 88 59 129 101 161 162 20 38 23 60 23 146 0 96 -2 103 -37 175 -21 40 -83 137 -138 213 -107 149 -117 176 -77 214 30 29 94 41 208 42 64 0 101 4 114 14 17 13 16 16 -26 66 -24 28 -51 56 -61 61 -26 14 -78 10 -138 -11 -30 -11 -58 -19 -62 -20 -19 0 -4 30 40 85 58 72 82 115 82 149 0 45 -58 58 -133 32z"/>
                            </g>
                        </svg>
                    : null
                }
            </span>
            {
                card.food !== 0
                ?  <ul>
                        {[...Array(card.food).keys()].map(f => (
                            <li key={f}></li>
                        ))}
                    </ul>
                : null
            }
            {
                card.properties.length > 0
                ? <BoardPropertyCards position={position} properties={card.properties} />
                : null
            }
        </CardWrapper>
    );
};

export default BoardCard;