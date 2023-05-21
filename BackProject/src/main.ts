import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from "cors";
import userRouter from "./routes/user-router.js"
import josparRouter from "./routes/jospar-router.js"
import subjectRouter from "./routes/subject-router.js"
import subjectCombinationsRouter from "./routes//subject-combinations-routes.js"
import topicRouter from "./routes/topic-router.js"
import taskTouter from "./routes/task-router.js"

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3500
const MONGODB_URI = "mongodb://127.0.0.1:27017/passport-jwt"


const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

connectDatabase()

app.use("/users", userRouter);
app.use("/jospar", josparRouter);
app.use("/subject", subjectRouter);
app.use("/subjectcombinations", subjectCombinationsRouter);
app.use("/topic", topicRouter);
app.use("/task", taskTouter);

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
