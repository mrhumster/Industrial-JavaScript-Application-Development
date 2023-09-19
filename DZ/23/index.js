// Реализация стора
const createStore = (reducer) => {
    let state = reducer(undefined, {type: '__INIT'})
    let subscribers = []

    return {
        getState: () => state,
        dispatch: action => {
            state = reducer(state, action)
            subscribers.forEach((callback) => callback())
        },
        subsribe: (callback) => subscribers.push(callback)
    }
}

const ACTIONS = {
    ADD_EVENT: 'ADD_EVENT',
    REMOVE_EVENT: 'REMOVE_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    SORT_EVENT: 'SORT_EVENT',
    SUCCESS_LOGIN: 'SUCCESS_LOGIN',
}


// actionCreator
const actionCreaterAddEvent = (eventInfo) => {
    // const eventInfoFull = fetch('запрос на получение данных')
    // prepare 
    const eventInfoFull = eventInfo

    return (
        {
            type: ACTIONS.ADD_EVENT,
            payload: eventInfoFull
        }
    )
}

const actionCreatedRemoveEvent = (eventInfo) => {
    // const eventInfoFull = fetch('запрос на получение данных')
    // prepare
    const eventInfoFull = eventInfo

    return (
        {
            type: ACTIONS.REMOVE_EVENT,
            payload: eventInfoFull
        }
    )
}

const actionCreateUpdateEvent = (eventInfo) => {
    // const eventInfoFull = fetch('запрос на получение данных')
    // prepare
    const eventInfoFull = eventInfo

    return (
        {
            type: ACTIONS.UPDATE_EVENT,
            payload: eventInfoFull
        }
    )
}

const actionCreaterSortEvents = () => {

    return (
        {
            type: ACTIONS.SORT_EVENT,
        }
    )
}

const initialStateEvents = {
    eventsWorld: [
        'Событие 1'
    ]
}


// reducer - чистая функция
// 1. не должно быть side - эффектов, т.е. асинхронные запросы
// 2. при передачи одних и тех же данных при вызове редюсера получаем один и тот же результат
// immutable
const reducerEvents = (state = initialStateEvents, action) => {
    switch (action.type) {
        case ACTIONS.ADD_EVENT:
            const newPartState = [...state.eventsWorld]
            newPartState.push(action.payload.text)

            const  newState = {
                ...state,
                eventsWorld: newPartState
            }

            return newState

        case ACTIONS.REMOVE_EVENT:
            return {
                ...state,
                eventsWorld: state.eventsWorld.filter(item => item !== action.payload.text)
            }



        case ACTIONS.UPDATE_EVENT:
            const idx = action.payload.idx
            const text = action.payload.text
            if (idx === undefined) {throw new Error('not idx in payload')}
            state.eventsWorld[idx] = text
             return state
        case ACTIONS.SORT_EVENT:
             return {
                 ...state,
                 eventsWorld: state.eventsWorld.sort()
             }

        default:
            return {
                ...state,
            }
    }

}

const initialStateUsers = {
    users: [
        'Пользователь 1'
    ]
}

const reducerLogin = (state = initialStateUsers, action) => {
    switch (action.type) {
        case ACTIONS.SUCCESS_LOGIN: 
            return {
                ...state,
                users: action.payload
            }
    


        default: 
            return {
                ...state,
            }    
    }

}

const combineReducers = (reducersMap) => {
    return (state, action) => {
        const nextState = {}

        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state ? state[key] : state, action)
        })

        return nextState
    }
}

const rootReducer = combineReducers({
    reducerEventsState: reducerEvents,
    reducerUsersState: reducerLogin
})

const store = createStore(rootReducer)

store.subsribe(() => console.log('Изменились события...'))

console.log('store до', store.getState())

store.dispatch(actionCreaterAddEvent({text: 'Событие 5'}))
store.dispatch(actionCreaterAddEvent({text: 'Событие 6'}))
store.dispatch(actionCreaterAddEvent({text: 'Событие 7'}))
store.dispatch(actionCreaterAddEvent({text: 'Событие 3'}))
console.log('store до сортировки', store.getState())
store.dispatch(actionCreaterSortEvents())
console.log('store после сортировки', store.getState())
store.dispatch(actionCreateUpdateEvent({text: 'Событие 99', idx:0}))
console.log('store после обновления', store.getState())
store.dispatch(actionCreatedRemoveEvent({text: 'Событие 88'}))
store.dispatch(actionCreaterSortEvents())
console.log('store после сортировки', store.getState())
store.dispatch(actionCreatedRemoveEvent({text: 'Событие 4'}))
store.dispatch(actionCreatedRemoveEvent({text: 'Событие 3'}))
store.dispatch(actionCreatedRemoveEvent({text: 'Событие 2'}))
store.dispatch(actionCreatedRemoveEvent({text: 'Событие 99'}))



console.log('store после', store.getState())