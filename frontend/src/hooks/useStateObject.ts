import { useReducer } from "react"

interface Setters {
    [key: string]: (payload: any) => void
}

interface State {
    [key: string]: any
}

interface Action {
    type: string,
    payload: any
}

export const useStateObject = (initialState = {}) => {

    const reducer = (state: State, action: Action) => {
        return {
            ...state,
            [action.type]: action.payload
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const setters: Setters = {};

    const capitalize = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

    for (const [key] of Object.entries(state)) {
        const actionType = `set${capitalize(key)}`;
        setters[actionType] = (payload) => {
            dispatch({
                type: key,
                payload
            });
        }
    }

    return {
        ...state,
        ...setters
    }
}