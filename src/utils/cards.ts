export const findInsertBeforeCard = (droppedCard, existingCards) => {
    let minDifference = Infinity;
    let cardToInsertBefore = null;

    existingCards.forEach(card => {
        const difference = card.x - droppedCard.x;

        // Проверяем, что разница положительна и минимальна
        if (difference > 0 && difference < minDifference) {
            minDifference = difference;
            cardToInsertBefore = card.element;
        }
    });

    return cardToInsertBefore;
};