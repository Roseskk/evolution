import React from 'react';
import {useActionChosenCardsContext} from "../../context/useActionChosenCards.tsx";
import {ModalWindow} from "../../styles/modal.ts";
import {CardsWrapper} from "../../styles/cards.ts";
import {CardWrapper} from "../cards/board/boardCard.tsx";
import socket from "../../api/ws/socket.ts";



const ActionCardsModal = () => {
    const {cards, setCards} = useActionChosenCardsContext()
    const handleDestroyCard = (cardId) => {
        socket.emit('actionResponse',{lobbyId: localStorage.getItem('lobby'),name:localStorage.getItem('name'),attackedCardId: cards.playerCard, actionType: cards.action, tailOut: true, propertyCardOutId: cardId.id})
        setCards(null)
    }
    return (
        <ModalWindow>
            <CardsWrapper>
                {
                    cards.propCardsCanDestroy.map(c =>(
                        <CardWrapper onClick={() => handleDestroyCard(c)}>
                            Удалить карту: {c.name}{c.id}
                        </CardWrapper>
                    ))
                }
            </CardsWrapper>
        </ModalWindow>
    );
};

export default ActionCardsModal;