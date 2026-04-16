import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { handleInput } from '../Order';
import ChatView from './ChatView';
import WelcomeView from './WelcomeView';

export default function () {
  const [messages, setMessages] = useState([]);
  const [inputBarText, setInputBarText] = useState('');
  const [points, setPoints] = useState(0); // ⭐ loyalty points
  const scrollViewRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => scrollToBottom());
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => scrollToBottom());

    scrollToBottom(false);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputBarText.trim().length === 0) return;

    let newMessages = [{ direction: 'right', text: inputBarText }];

    const result = handleInput(inputBarText);
    const responses = result.responses;

    for (const message of responses) {
      newMessages.push({ direction: "left", text: message });
    }

    // ⭐ add points when order completes
    if (result.orderComplete) {
      setPoints(prev => {
        const newPoints = prev + 1;

        newMessages.push({
          direction: "left",
          text: `⭐ You earned a point! (${newPoints}/10)`
        });

        if (newPoints === 10) {
          newMessages.push({
            direction: "left",
            text: "🎉 Congrats! Your next order is FREE!"
          });
        }

        return newPoints;
      });
    }

    setMessages(prev => [...prev, ...newMessages]);
    setInputBarText('');
  };

  return (
    <View style={styles.outer}>
      <Text style={styles.points}>Points: {points}/10</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {messages.length ? (
          <ChatView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            scrollViewRef={scrollViewRef}
            styles={styles}
            messages={messages}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        ) : (
          <WelcomeView
            scrollToBottom={scrollToBottom}
            sendMessage={sendMessage}
            scrollViewRef={scrollViewRef}
            styles={styles}
            messages={messages}
            setInputBarText={setInputBarText}
            inputBarText={inputBarText}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: 'white'
  },
  points: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold'
  }
});