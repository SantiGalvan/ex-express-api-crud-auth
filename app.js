const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const postsRouter = require("./routers/posts.js");
const categoriesRouter = require("./routers/categories.js");
const tagsRouter = require("./routers/tags.js");
const authRouter = require("./routers/auth.js");
const cors = require("cors");

app.use(cors());

app.use(express.json());

// User
app.use('/auth', authRouter);

// Post
app.use('/posts', postsRouter);

// Categorie
app.use('/categories', categoriesRouter);

// Tags
app.use('/tags', tagsRouter);

app.listen(port, host, () => {
    console.log(`Server attivo su http://${host}:${port}`);
})