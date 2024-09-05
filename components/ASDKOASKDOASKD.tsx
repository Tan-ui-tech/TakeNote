
import { ReactElement } from "react";
import { View, StyleSheet } from "react-native"

export default function LightDarkView(props: {
    isLightMode: boolean;
    // childrens?: ReactElement[]
    children?: ReactElement[]
}) {
    return (
        <View style={[styles.container, props.isLightMode ? styles.lightBackground : styles.darkBackground]}>
            {/* {props.childrens} */}
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    // Light mode styles
    lightBackground: {
        backgroundColor: '#FFF',
    },
    lightText: {
        color: '#000',
    },
    lightInput: {
        backgroundColor: '#E0E0E0',
    },
    lightCard: {
        backgroundColor: '#F0F0F0',
    },
    // Dark mode styles
    darkBackground: {
        backgroundColor: '#121212',
    },
})