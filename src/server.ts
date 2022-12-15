import express from 'express';

const PORT = process.env.PORT || 8800;

const app = express();

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening server on PORT ${PORT}`));
