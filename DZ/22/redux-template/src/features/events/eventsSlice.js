import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
    name: 'event',
    initialState: {
        value: {}
    },
    reducers: {
        addNewEvent: (state, action) => {
            const event_id = action.payload.id
            if (event_id in Object.keys(state.value)) {
                throw new Error(`Event with id: ${event_id} already exist.`)
            }
            state.value[event_id] =  action.payload
        },
        removeEvent: (state, action) => {
            const event_id = action.payload.id
            delete state.value[event_id]
        },
        updateEvent: (state, action) => {
            const event_id = action.payload.id
            state.value[event_id] = action.payload
        }
    }
})

export const { addNewEvent, removeEvent, updateEvent } = eventsSlice.actions

export default eventsSlice.reducer