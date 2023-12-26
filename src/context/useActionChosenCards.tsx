import {createContext, ReactNode, useContext, useState} from "react";

interface IActionCardsContext {
    action: string
    playerCard: number,
    propCardsCanDestroy: number[],
    setCards: (...args: any) => void
}


export const ActionChosenCardsContext = createContext<IActionCardsContext | null>(null)


interface IActionChosenCardsProviderProps {
    children: ReactNode;
}

export const ActionChosenCardsProvider = ({children}: IActionChosenCardsProviderProps) => {
    const [cards, setCards] = useState(null)
    return(
        <ActionChosenCardsContext.Provider value={{cards: cards, setCards: setCards}}>
            {children}
        </ActionChosenCardsContext.Provider>
    )
}

export const useActionChosenCardsContext = () => {
    const actionContext = useContext(ActionChosenCardsContext)
    if (!actionContext) throw new Error('wrap that ctx')
    return actionContext
}