import {useSelector} from "react-redux";
import {useState} from "react";
import {Event} from "./Event";

export const EventsList = () => {
    const events = useSelector((state) => state.events.value)
    const listEvents = Object.entries(events).map(([id, event]) =>
        <Event event={event} />
    )
    return (
        <ul className="event_list">
            {listEvents}
        </ul>
    )
}