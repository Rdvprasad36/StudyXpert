const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');
const fs = require('fs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here',
});
const openai = new OpenAIApi(configuration);

const CHAT_HISTORY_DIR = path.join(__dirname, '../data/chat_histories');
if (!fs.existsSync(CHAT_HISTORY_DIR)) {
  fs.mkdirSync(CHAT_HISTORY_DIR, { recursive: true });
}

router.post('/', async (req, res) => {
  try {
    const { message, chatHistory = [], topic = 'general', model = 'gpt-3.5-turbo' } = req.body;

    const systemPrompt = `You are StudentXpert, an AI tutor specialized in exam preparation. 
Analyze uploaded study materials and provide structured responses for effective learning.
Format answers according to mark allocation and include relevant examples.
Suggest related topics and practice questions when appropriate.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.createChatCompletion({
      model: model,
      messages: messages,
      max_tokens: 1500,
      temperature: 0.7,
    });

    const response = completion.data.choices[0].message.content;

    // Save chat history to local JSON file by topic
    const chatFilePath = path.join(CHAT_HISTORY_DIR, `${topic}.json`);
    let existingHistory = [];
    if (fs.existsSync(chatFilePath)) {
      const fileData = fs.readFileSync(chatFilePath, 'utf-8');
      existingHistory = JSON.parse(fileData);
    }
    existingHistory.push({ role: 'user', content: message });
    existingHistory.push({ role: 'assistant', content: response });
    fs.writeFileSync(chatFilePath, JSON.stringify(existingHistory, null, 2));

    res.json({
      success: true,
      response: response,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat request',
    });
  }
});

module.exports = router;
