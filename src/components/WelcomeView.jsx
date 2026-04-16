import { View, Text, StyleSheet } from 'react-native';
import InputBar from "./InputBar";

export default function({scrollToBottom, sendMessage, setInputBarText, inputBarText}){
    return(
        <View style={styles.container}>
            
            <View style={styles.center}>
                <Text style={styles.title}>Jasmine’s Pizza 🍕</Text>
                <Text style={styles.subtitle}>
                    Ask me anything or start your order!
                </Text>
                <Text style={styles.hint}>
                    Try: "I want a large pizza"
                </Text>
            </View>

            <InputBar 
                onSendPressed={sendMessage} 
                onSizeChange={() => scrollToBottom(false)}
                onChangeText={setInputBarText}
                text={inputBarText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    },
    hint: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    }
});