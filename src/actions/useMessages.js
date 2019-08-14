import { useState } from "react";

let messageId = 0;

const useMessages = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (content) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "message",
            content,
            messageId: messageId++
        });
        setMessages(newMessages);
    }

    const addError = (content) => {
        const newMessages = messages.slice();
        newMessages.push({
            type: "error",
            content,
            messageId: messageId++
        });
        setMessages(newMessages);
    }

    const clearMessage = (index) => {
        const newMessages = messages.slice();
        newMessages.splice(index, 1);
        setMessages(newMessages);
    }

    return { messages, addMessage, addError, clearMessage };
}

export default useMessages;
