const express = require('express');
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  // The query parameters
  const slackName = req.query.slackName || 'Oluwole Zacchaeus';
  const track = req.query.track || 'Backend';
  
  // The current day of the week
  const currentDayOfWeek = moment().tz('UTC').format('dddd');
  
  // The current UTC time with validation of +/-2 hours
  const currentTime = moment().tz('UTC').format();
  const isValidTime = moment().isBetween(moment().subtract(2, 'hours'), moment().add(2, 'hours'));
  
  // The GitHub URL of the file being run
  const githubFileURL = 'https://github.com/Zacchaeus-Oluwole/b_stage_one/blob/main/server.js';
  
  // The GitHub URL of the full source code
  const githubSourceCodeURL = 'https://github.com/Zacchaeus-Oluwole/b_stage_one';
  
  // The response data
  const responseData = {
    slackName,
    currentDayOfWeek,
    currentTime,
    track,
    githubFileURL,
    githubSourceCodeURL,
    statusCode: 'Success',
  };
  
  // The status code and JSON response
  if (isValidTime) {
    res.status(200).json(responseData);
  } else {
    res.status(400).json({ error: 'Invalid UTC time' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
