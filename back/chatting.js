const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  },
});

// 파일을 업로드할 디렉토리와 파일명 설정
const storage = multer.diskStorage({
  destination: 'public/uploads/', // 업로드될 파일의 경로
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // 파일명을 현재 시간과 함께 설정
  },
});

const upload = multer({ storage });

// 파일 업로드 처리 엔드포인트
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('>>>>>>> 파일 업로드 요청:', req.file.originalname);
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ fileUrl });
  console.log('>>>>>>> 파일 업로드 완료, URL:', fileUrl);
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('>>>>>>> a user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('>>>>>>> user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('@@@@@@@@@@@@메시지 수신 @@@@@@@@@@@@', msg);
    io.emit('chat message', msg);
  });
});

server.listen(4001, () => {
  console.log('>>>>>>> listening on *:4001');
});