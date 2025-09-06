import express from 'express';
import ai from 'ai';
import { google } from '@ai-sdk/google';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('working.');
});

app.get('/summary/:name', async (req, res) => {
  const name = req.params.name;
  const prompt = req.body.prompt;

  const { text } = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: `I want you to answer this question based on popular cricket player ${name}: `,
  });
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
