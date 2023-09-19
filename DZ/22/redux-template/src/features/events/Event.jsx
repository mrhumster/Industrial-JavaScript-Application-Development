import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateEvent, removeEvent} from "./eventsSlice";

export const Event = (props) => {
    const { event } = props
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(e)
        const data = {
            id: e.target.event_id.value,
            description: e.target.description.value,
            date: new Date().toLocaleString() + ""
        }
        dispatch(updateEvent(data))
        setEditMode(false)
    }

    const deleteHandler = (e) => {
        dispatch(removeEvent(event))
    }

    return (
        <li key={event.id} id={event.id}>
            {editMode?
                <form onSubmit={submitHandler}>
                    <div className="input">
                        <input id="description" type="text" name="description" defaultValue={event.description} autoFocus/>
                        <input id="event_id" type="hidden" value={event.id}/>
                    </div>
                    <button>Update event</button>
                </form>
                :
                <div>
                    <div className="event_description">
                        {event.description}
                    </div>
                    <div className="event_date">
                        {event.date}
                    </div>
                    <button onClick={() => setEditMode(true)}>Изменить</button>
                    <button onClick={() => deleteHandler()}>Удалить</button>
                </div>
            }
        </li>
    )
}