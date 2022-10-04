const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.set('port', 8000);

app.locals.title = 'Notifications';

app.locals.notifications = [
  {
    id: 1,
    interactionFrom: 'Jean Luc Picard',
    interactionTo: 'Cyanne Jones',
    interactionType: 'liked',
    interactionSubject: 'photo',
    dateCreated: 1664914999,
    interactionLink: "https://i.imgur.com/QnkFrG3.gif"
  },
  {
    id: 2,
    interactionFrom: 'William Riker',
    interactionTo: 'Cyanne Jones',
    interactionType: 'liked',
    interactionSubject: 'post',
    dateCreated: 1664916000,
    interactionLink: "https://www.lipsum.com/"
  },
  {
    id: 3,
    interactionFrom: 'Deanna Troi',
    interactionTo: 'Cyanne Jones',
    interactionType: 'commented on',
    comment: 'What a cute cat!',
    interactionSubject: 'photo',
    dateCreated: 1664816000,
    interactionLink: "https://i.imgur.com/QnkFrG3.gif"
  },
  {
    id: 4,
    interactionFrom: 'Data',
    interactionTo: 'Cyanne Jones',
    interactionType: 'commented on',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    interactionSubject: 'post',
    dateCreated: 1664716000,
    interactionLink: "https://www.lipsum.com/"
  },
  {
    id: 5,
    interactionFrom: 'Beverly Crusher',
    interactionTo: 'Cyanne Jones',
    interactionType: 'liked',
    interactionSubject: 'post',
    dateCreated: 1664616000,
    interactionLink: "https://www.lipsum.com/"
  }
];

app.get('/api/v1/notifications', (request, response) => {
  const { notifications } = app.locals
  response.json({ notifications })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});