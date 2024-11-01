
import { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { Screen } from "../components/Screen"
import { getCalendarEvents, CalendarEvent } from "../lib/calendar-events";
//import { AnimatedEventCard } from "./EventCard"
import { EventCard } from "./EventCard";

export function Main(){
    const [ eventsCards, setEventsCards ] = useState<CalendarEvent[]>([]);

    const { width } = useWindowDimensions();
    console.log("WIDTH ---->", width)

    const numColumns = width > 767 ? 3 : 1;


    useEffect(() => {
		getCalendarEvents().then((eventsCards) => {
			setEventsCards(eventsCards)
		})
	}, []);
    console.log("NUM COLUMNS ---->", numColumns)
    return (
        <Screen>
            {eventsCards.length === 0 ? (
                <ActivityIndicator color={"#fff"} size={"large"} />
            ) : (       
                <View style={[styles.container, { flexDirection: numColumns > 1 ? 'column' : 'row', flexWrap: numColumns > 1 ? 'nowrap' : 'wrap' }]}>
                    <FlatList
                        numColumns={numColumns}
                        data={eventsCards}
                        keyExtractor={(card) => card.id.toString()}
                        renderItem={({ item, index }) => (                        
                            // <AnimatedEventCard card={item} index={index.toString()} style={{flex: 1}} />
                            <EventCard card={item} />
                        )}
                        style={styles.flatList}
                        columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
                    />
                </View>
            )}
        </Screen>
    )
}

const styles = StyleSheet.create({
    flatList: {
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    container: {
        flex: 1,
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 20,
    },
    item: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        margin: 6,
        alignItems: 'center'
    },
    columnWrapper: {
        //justifyContent: 'space-between',
    },
})