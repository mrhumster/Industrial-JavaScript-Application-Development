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
        
        // case ACTIONS.REMOVE_EVENT: 
        //     return {
        //         ...state,
        //         eventsWorld
        //     } 

        // case ACTIONS.UPDATE_EVENT: 
        //     return {
        //         ...state,
        //         eventsWorld
        //     } 

        // case ACTIONS.SORT_EVENT:  
        //     return {
        //         ...state,
        //         eventsWorld
        //     }  

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

const logger = (store) => dispatch => action => {
    // логирование действия пользователей
    {

    }
    console.log('TYPE_ACTION - ', action.type)
}

const applyMiddleware = (middleware) => {
    return (createStore) => {
        return (reducer) => {
            const store = createStore(reducer)

            return {
                dispatch: action => middleware(store)(store.dispatch)(action),
                getState: store.getState
            }
        }
    }
}

const createStoreMiddleware = applyMiddleware(logger)(createStore)
const storeMiddleware = createStoreMiddleware(rootReducer)

console.log('storeMiddleware = ', storeMiddleware.getState())
storeMiddleware.dispatch(actionCreaterAddEvent({text: 'Событие 88'}))

// const store = createStore(rootReducer)

// store.subsribe(() => console.log('Изменились события...'))

// console.log('store до', store.getState())

// store.dispatch({type: 'ADD_EVENT', payload: {text: 'Событие 2'}})
// store.dispatch({type: ACTIONS.ADD_EVENT, payload: {text: 'Событие 3'}})
// store.dispatch({type: ACTIONS.ADD_EVENT, payload: {text: 'Событие 4'}})
// store.dispatch(actionCreaterAddEvent({text: 'Событие 88'}))


// console.log('store после', store.getState())


