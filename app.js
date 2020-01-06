const express = require('express');
const app = express();
const connectDB = require('./config/db');
var cors = require('cors');

// Connect to database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init middleware
app.use(express.json({ extended: false })); // "extended: false" allow to pass req.body as json format. Otherwise req.body shows empty

app.get('/', (req, res) => res.send('API is healthy!'));

// use routes
app.use('/api/inventorytypes', require('./routes/api/inventoryTypeApi'));
app.use('/api/customers', require('./routes/api/customerApi'));
app.use('/api/products', require('./routes/api/productApi'));
app.use('/api/invoices', require('./routes/api/invoiceApi'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
