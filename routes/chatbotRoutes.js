// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
// POST route to handle user messages
router.post('/message', async (req, res) => {
const userMessage = req.body.message;
if (!userMessage) {
return res.status(400).json({ message: 'Message cannot be empty' });
}
// Predefined responses
let botResponse = 'Sorry, I didn\'t understand that.';
const predefinedReplies = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! What can I do for you?",
    "hey": "Hey! How can I help you today?",
    "bye": "Goodbye! Have a great day!",
    "see you later": "See you later! Take care!",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what's your name?": "I'm your friendly chatbot! You can call me Bot.",
    "what can you do?": "I can assist you with various queries. Just ask!",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
    "thank you": "You're welcome! If you have any more questions, feel free to ask.",
    "help": "I'm here to help! What do you need assistance with?",
    "what time is it?": "I'm not sure of the exact time, but it's always a good time to chat!",
    "who created you?": "I was created by a team of developers who love building chatbots!",
    "where can I find support?": "You can find support on our support page or by asking me!",
    "tell me about yourself": "I'm a chatbot designed to assist you. I'm here to chat anytime!",
    "what's the weather like?": "I'm not sure about the weather, but I can help you find a forecast!",
    "help me with a task": "Sure! What task do you need help with?",
    "good morning": "Good morning! How can I help you start your day?",
    "good evening": "Good evening! How can I assist you this evening?",
    "good night": "Good night! Sleep well and talk to you later!"
};

// Check if the message has a predefined response
for (const key in predefinedReplies) {
if (userMessage.toLowerCase().includes(key)) {
botResponse = predefinedReplies[key];
break;
}
}
// Save conversation in MongoDB
const chat = new Chat({
userMessage,
botResponse
});
await chat.save();
// Send the bot's response back to the client
res.json({ message: botResponse });
});
module.exports = router;
