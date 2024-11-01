import { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text, Animated, Pressable, Dimensions, useWindowDimensions, Platform } from "react-native";
import { Href, Link } from "expo-router";
//import { Link } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const baseUrl = 'http://localhost:5001';
const screenWidth = Dimensions.get('window').width;
const itemSpacing = 42;
const numColumns = 2;
const totalHorizontalPadding = itemSpacing * (numColumns - 1);

interface CardProps {
    id: number; // Asegúrate de que el id sea de tipo string
    name: string;
    date: string;
    image: string;
    distance: distanceProps[];
    place: string;
}

interface distanceProps {
    run: string;
    bike: string;
}

export function EventCard({ card }: { card: CardProps }) {

    const { width } = useWindowDimensions();

    const numColumns = width > 767 ? 4 : 1;
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('es', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }).format(date);    

        return formattedDate;
    };

    console.log("IDD--- EVEN T+CARD", card)

    const { distance } = card;

    console.log("DISTANCE", distance)
    //const keys = Object.keys(distance);
    //const keys = Array.isArray(distance) && distance.flatMap(item => Object.keys(item));
    const keyValuePairs = Array.isArray(distance) && distance.flatMap(item => 
        Object.entries(item).map(([key, value]) =>  ({ key, value }))
    );

    const keys = Array.isArray(distance) && distance.flatMap(item => Object.keys(item));
    const values = Array.isArray(distance) && distance.flatMap(item => Object.values(item));
    console.log("DISTANCE KEYS", keys, values)


    return (
        <Link href={`/${card.id}` as Href<string>} asChild >
            <Pressable style={styles.pressable} >
                {/* <View key={card.id} style={[styles.cardContainer, styles.item, { width: `${100 / numColumns}%`}]}> */}
                <View key={card.id} style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image}
                            source={{ uri: `${baseUrl}/${card.image}` }}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.details}>
                            <Text style={styles.cardName}>{card.name}</Text>
                            <Text style={styles.cardDate}>{formatDate(card.date)}</Text>
                            <Text>{card.place}</Text>
                        </View>                        
                        {/* {Array.isArray(distance) && distance.map((dist, index) => (                            
                            <View style={styles.distanceContainer}>
                                <Text>{dist.run}</Text>
                                <MaterialCommunityIcons name="bike" size={24} color="black" />
                                <MaterialCommunityIcons name="run-fast" size={24} color="black" />
                            </View>
                        ))} */}
                        {/* { Array.isArray(keys) && keys.map((item, index) => (
                            <Text>{item}</Text>
                        ))} */}
                        {Array.isArray(keyValuePairs) && keyValuePairs.map((pair, index) => (
                                <View style={styles.distanceContainer}>
                                    <MaterialCommunityIcons name={pair.key == 'run' ? 'run-fast' : 'bike'} size={24} color="black" />
                                    <Text>{pair.value}</Text>
                                </View>
                        ))}
                    </View>
                </View>
            </Pressable>
        </Link>
    );
}

// export function AnimatedEventCard({ card, index }) {
//     const opacity = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         const animation = Animated.timing(opacity, {
//             toValue: 1,
//             duration: 200,
//             //delay: index * 250,
//             useNativeDriver: true,
//         });

//         animation.start();

//         return () => animation.stop();
//     }, [opacity, index]);
    
//     return (
//         <Animated.View style={{opacity}} >
//             <EventCard card={card}/>
//         </Animated.View>
//     )
// }

const styles = StyleSheet.create({
    pressable: {
        opacity: 1, // This is for the active state, you can customize it further if needed
        //borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 6,
        paddingVertical: 16,
        paddingHorizontal: 6,
        ...(Platform.OS === 'web' && {
            marginRight: 16,
            width: 360
        }),
        ...(['ios', 'android'].includes(Platform.OS) && {
            marginRight: 0
        })
        // backgroundColor: '#fff',
        // borderRadius: 10,
        // ...(Platform.OS === 'web' && {
        // // Reemplaza las sombras por boxShadow para web
        // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        // }),
        // ...(['ios', 'android'].includes(Platform.OS) && {
        // // Sombras para mobile
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.3,
        // shadowRadius: 4,
        // elevation: 3,
        // }),
    },
    imageContainer: {
        width: 80, // Equivalent to w-20
        borderRadius: 50, // For rounded image
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 56, // Equivalent to w-14
        height: 56, // Equivalent to h-14
        borderRadius: 50, // Fully rounded
    },
    detailsContainer: {
        // borderLeftWidth: 2,
        // borderColor: '#d1d5db', // Equivalent to border-l-gray-200
        marginLeft: 12,
        marginRight: 12,
        flex: 1,
    },
    details: {
        //paddingLeft: 16,
    },
    cardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0ea5e9', // Equivalent to text-sky-600
        marginBottom: 8,
    },
    cardDate: {
        color: '#6b7280', // Equivalent to text-gray-500
        marginBottom: 4,
    },
    distanceContainer: {
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: 24, // Equivalent to w-8
        // height: 24, // Equivalent to h-8
        backgroundColor: '#0ea5e9', // Equivalent to bg-sky-600
        //borderRadius: 20, // Fully rounded
    },
    distanceText: {
        fontFamily: 'monospace', // Equivalent to font-mono
        fontWeight: '600',
        fontSize: 10, // Equivalent to text-xs
        color: '#ffffff', // Equivalent to text-white
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    item: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        margin: 6,
        alignItems: 'center'
    }
});
