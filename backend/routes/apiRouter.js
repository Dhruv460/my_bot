import express from 'express';
import userRoutes from './userRoutes.js';
import ChatHistory from '../models/ChatHistory.js';
import run from '../friend_gemini.js';
import {protect} from '../middleware/AuthMiddleware.js'
const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);

apiRouter.post('/prompt-post',protect, async (req, res) => {
  try {
    const { userId, prompt } = req.body;

  
    const chatHistory = await ChatHistory.findOne({ userId });
    const previousChats = chatHistory ? chatHistory.chats.map(chat => ({
      role: "user",
      text: chat.prompt,
    })).concat(chatHistory.chats.map(chat => ({
      role: "model",
      text: chat.response,
    }))) : [];

 
    const response = await run(prompt, previousChats);

    if (chatHistory) {
      chatHistory.chats.push({ prompt, response });
      await chatHistory.save();
    } else {
      const newChatHistory = new ChatHistory({
        userId,
        chats: [{ prompt, response }],
      });
      await newChatHistory.save();
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while generating the response.');
  }
});

apiRouter.get('/chat-history/:userId',protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const chatHistory = await ChatHistory.findOne({ userId });

    if (chatHistory) {
      res.json(chatHistory.chats);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while fetching chat history.');
  }
});

export default apiRouter;
