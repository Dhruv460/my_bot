import express from 'express';
import userRoutes from './userRoutes.js';
import ChatHistory from '../models/ChatHistory.js';
import run from '../friend_gemini.js';

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);

apiRouter.post('/prompt-post', async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Fetch the user's chat history
    const chatHistory = await ChatHistory.findOne({ userId });
    const previousChats = chatHistory ? chatHistory.chats.map(chat => ({
      role: "user",
      text: chat.prompt,
    })).concat(chatHistory.chats.map(chat => ({
      role: "model",
      text: chat.response,
    }))) : [];

    // Generate AI response with reference to previous chats
    const response = await run(prompt, previousChats);

    // Save the prompt and response to the user's chat history
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

apiRouter.get('/chat-history/:userId', async (req, res) => {
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
