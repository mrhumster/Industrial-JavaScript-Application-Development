import './App.css';
import {AddNewEvent} from "./features/events/AddNewEvent";
import {EventsList} from "./features/events/EventsList";

function App() {
  return (
      <div className="container">
          <h5>REACT REDUX EVENT APP</h5>
        <AddNewEvent />
        <EventsList />
      </div>
  );
}

export default App;
