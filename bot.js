const Discord = require('discord.js');
const express = require('express');
const { Webhook, createEventHandler } = require('@octokit/webhooks');

const app = express();
const port = 3000;

const botToken = 'YOUR_BOT_TOKEN';
const webhookSecret = 'YOUR_WEBHOOK_SECRET';

const client = new Discord.Client();
const webhookHandler = createEventHandler({ secret: webhookSecret });

webhookHandler.on('*', ({ id, name, payload }) => {
  // Change the channel ID to match the channel you want to send messages to
  const channel = client.channels.cache.get('YOUR_CHANNEL_ID');

  if (name === 'push') {
    const repoName = payload.repository.full_name;
    const commitCount = payload.commits.length;

    channel.send(`New changes in ${repoName} (${commitCount} commits).`);
  }
});

app.use(express.json());
app.use('/webhook', webhookHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

client.login(botToken);
