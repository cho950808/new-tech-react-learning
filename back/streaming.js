const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

const remoteVideoUrl = 'https://download.blender.org/durian/trailer/big_buck_bunny_720p_surround.avi';

app.get('/video', (req, res) => {
  const range = req.headers.range;

  if (!range) {
    res.status(400).send('Requires Range header');
    return;
  }

  // 원격 비디오 요청
  const options = {
    url: remoteVideoUrl,
    headers: {
      'Range': range,
    },
  };

  request
    .get(options)
    .on('response', (response) => {
      res.writeHead(response.statusCode, response.headers);
    })
    .pipe(res);
});

app.listen(4002, () => {
  console.log('Server is running on port 4002');
});