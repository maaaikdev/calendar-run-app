import { getEventDetails, CalendarEvent } from "@/lib/calendar-events";
import { useLocalSearchParams, Stack } from "expo-router";
import { useState, useEffect } from "react";
import { Screen } from "@/components/Screen";
import { ActivityIndicator, ScrollView, View, StyleSheet, Image, Text } from "react-native";

const baseUrl = 'http://localhost:5001';

export default function DetailEvent(){
    const { eventId } = useLocalSearchParams();
    const [ eventInfo, setEventInfo ] = useState<CalendarEvent>();
    
    useEffect(() => {
        console.log("IDD--- 1", eventId)
        if(eventId){
            console.log("IDD--- 2", eventId)
            getEventDetails(Number(eventId)).then(setEventInfo);
        }
    }, [eventId]);

    console.log("eventInfo------->", eventInfo)

    return (
        <Screen>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: "#ffee00" },
                    headerTintColor: "black",
                    headerTitle: "The Legend of Zelda: Breath of the wild",
                    headerLeft: () => (<></>),
                    headerRight: () => (<></>)
                }}
            />
            <View>
                { eventInfo == null ? (
                    <ActivityIndicator color={"#fff"} size={"large"} />
                ) : (
                    <ScrollView>
                        <View style={styles.container}>
                            <Image 
                                style={styles.image}
                                source={{ uri: `${baseUrl}/${eventInfo.image}` }}
                            />
                            <Text style={styles.title}>Detalle del juego { eventInfo.name }</Text>
                            <Text style={styles.description}>{ eventInfo.name }</Text>
                        </View>
                    </ScrollView>
                )}
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        marginBottom: 16, // mb-4
        borderRadius: 8,  // rounded
        width: 214,
        height: 294,
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 32, // mb-8
        fontSize: 24,     // text-2xl
    },
    description: {
        color: 'rgba(255, 255, 255, 0.7)', // text-white/70
        marginTop: 16, // mt-4
        textAlign: 'left',
        marginBottom: 32, // mb-8
        fontSize: 16, // text-base
    },
})