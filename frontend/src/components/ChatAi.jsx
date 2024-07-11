import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../index.css';
import { AuthContext } from '../AuthContext';
import { ThemeContext } from '../ThemeContext';

const ChatAi = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const userId = localStorage.getItem('userId');
  const { username } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/chat-history/${userId}`);
        setChatHistory(res.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [userId]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/prompt-post', { userId, prompt });
      const newChat = { prompt, response: res.data };
      setChatHistory((prevHistory) => [...prevHistory, newChat]);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div className={`chat-container ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <div className="chat-sidebar">
        <h2>Chat History</h2>
        <ul>
          {chatHistory.map((chat, index) => (
            <li key={index}>
              <span>{`${getInitial(username)}: ${chat.prompt.slice(0, 20)}...`}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        <header className="chat-header">
          <h1>Chat with AI</h1>
        </header>
        <div className="chat-messages">
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-message-box">
              <div className="chat-message">
                <div className="chat-prompt">
                  <strong>
                    <div className="user-initial">
                      {getInitial(username)}
                    </div>
                  </strong> {chat.prompt}
                </div>
                <div className="chat-response">
                  <strong>AI:</strong> {chat.response}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt here..."
            className="chat-input"
          />
          <button type="submit" className="chat-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAi;