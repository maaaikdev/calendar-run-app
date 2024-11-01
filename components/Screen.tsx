import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface ScreenProps {
    children: ReactNode;
}

export function Screen({ children }: ScreenProps) {
    return <View style={styles.view}>{children}</View>
}

const styles = StyleSheet.create({
    view: {
        flex: 1, 
        backgroundColor: 'white', 
        paddingVertical: 16 
    }
})