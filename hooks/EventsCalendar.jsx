import { createContext, useEffect, useState } from "react";

export const EventsContext = createContext({
    eventsCalendar: [],
    addEvent: () => {}
});

export const EventsProvider = ({ children }) => {
    const [ eventsCalendar, setEventsCalendar ] = useState([]);

    useEffect(() => {
        async function fetchAPIEvents(){
            const baseUrl = 'http://localhost:5001';
            const LATEST_EVENTS = `${baseUrl}/events`;
            const rawData = await fetch(LATEST_EVENTS);
            const items = await rawData.json();

            setEventsCalendar(items);
        }
        fetchAPIEvents();
    }, []);

    const addEvent = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    
    const value = {
        eventsCalendar,
        addEvent
    }    

    return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}