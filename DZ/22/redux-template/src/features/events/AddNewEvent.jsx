import {useState} from 'react'
import {useDispatch} from "react-redux";
import './styles.css'
import {addNewEvent} from "./eventsSlice";

export const AddNewEvent = () => {
    const dispatch = useDispatch()
    const [id, setId] = useState(crypto.randomUUID())
    const date = new Date().toLocaleString() + ""
    const submitHandler = (e) => {
        e.preventDefault()

        const data = {
            id: id,
            description: e.target.description.value,
            date: date
        }
        dispatch(addNewEvent(data))

        setId(crypto.randomUUID())
    }
    return (
        <div className="add_new_event">
            <form onSubmit={submitHandler}>
                <div className="input">
                    <label htmlFor="description">Описание</label>
                    <input id="description" type="text" name="description"/>
                </div>
                <button>Добавить событие</button>
            </form>
        </div>
    )
}