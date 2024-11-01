/*const baseUrl = 'http://localhost:5001';

export async function getCalendarEvents(){    
    const LATEST_EVENTS = `${baseUrl}/events`;

    console.log("ITEMAS 12", LATEST_EVENTS)

    const rawData = await fetch(LATEST_EVENTS);
    const items = await rawData.json();

    // console.log("ITEMAS 2", json)

    // const { items } = json;
    // console.log("ITEMAS 3", items)

    return items.map((item) => {
        const { id, name, date, image, distance, place, elevationGain, category, organizationName, organizationLogo, urlSite, location } = item;
        const { latitude, length } = location;

        return {
            id,
            name,
            date,
            image,
            distance,
            place,
            elevationGain,
            category,
            organizationName,
            organizationLogo,
            urlSite,
            latitude,
            length
        }
    });
};

export async function getEventDetails(id){
    const EVENT_DETAILS = `${baseUrl}/events/${id}`;

    const rawData = await fetch(EVENT_DETAILS);
    const json = await rawData.json();

    const { category, date, distance, elevationGain, image, location,  name,  organizationLogo,  organizationName, place, price, urlSite } = json;
    const { latitude, length } = location;
    return {
        id,
        name,
        date,
        image,
        distance,
        place,
        elevationGain,
        category,
        organizationName,
        organizationLogo,
        urlSite,
        latitude,
        length
    }
}*/
const baseUrl = 'http://localhost:5001';

// Define interfaces para los eventos y detalles de eventos
export interface EventLocation {
    latitude: number; // Asegúrate de que esta propiedad esté aquí
    longitude: number;   // Asegúrate de que esta propiedad esté aquí
}

export interface CalendarEvent {
    id: number; // Cambia el tipo si es necesario
    name: string;
    date: string;
    image: string;
    distance: distanceProps[];
    place: string;
    elevationGain: number;
    category: string;
    organizationName: string;
    organizationLogo: string;
    urlSite: string;
    location: EventLocation; // Agrega el tipo de ubicación
}

export interface distanceProps {
    run: string;
    bike: string;
}

export interface EventDetails extends CalendarEvent {
    price: number; // Si price es parte de los detalles del evento
}

// Función para obtener eventos del calendario
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
    const LATEST_EVENTS = `${baseUrl}/events`;

    console.log("ITEMAS 12", LATEST_EVENTS);

    const rawData = await fetch(LATEST_EVENTS);
    const items: CalendarEvent[] = await rawData.json();

    return items.map((item) => {
        const {
            id,
            name,
            date,
            image,
            distance,
            place,
            elevationGain,
            category,
            organizationName,
            organizationLogo,
            urlSite,
            location
        } = item;

        return {
            id,
            name,
            date,
            image,
            distance,
            place,
            elevationGain,
            category,
            organizationName,
            organizationLogo,
            urlSite,
            location
        };
    });
}

// Función para obtener detalles de un evento
export async function getEventDetails(id: number): Promise<EventDetails> {
    const EVENT_DETAILS = `${baseUrl}/events/${id}`;

    const rawData = await fetch(EVENT_DETAILS);
    const json: EventDetails = await rawData.json();

    const { category, date, distance, elevationGain, image, location, name, organizationLogo, organizationName, place, price } = json;

    return {
        id, // Asegúrate de que esta propiedad esté definida en EventDetails
        name,
        date,
        image,
        distance,
        place,
        elevationGain,
        category,
        organizationName,
        organizationLogo,
        urlSite: json.urlSite, // Si también está en el JSON de respuesta
        location,   // Ahora está definido aquí
        price // Incluye price si es parte del evento
    };
}
