import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';

export default function({scrollToBottom, scrollViewRef, sendMessage, styles, messages, setInputBarText, inputBarText}){
    return(
        <>
            <View style={localStyles.header}>
                <Text style={localStyles.headerText}>
                    Jasmine’s AI 🍕
                </Text>
            </View>

            <ScrollView 
                ref={scrollViewRef} 
                style={styles.messages}
                onContentSizeChange={() => scrollToBottom()}
            >
                {messages.map((msg, index) => (
                    <MessageBubble 
                        key={index} 
                        direction={msg.direction} 
                        text={msg.text} 
                    />
                ))}
            </ScrollView>

            <InputBar 
                onSendPressed={sendMessage} 
                onSizeChange={() => scrollToBottom(false)}
                onChangeText={setInputBarText}
                text={inputBarText}
            />
        </>
    );
}

const localStyles = StyleSheet.create({
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});