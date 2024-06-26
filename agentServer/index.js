import express from "express";
import cors from 'cors';
import mysql from "mysql";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static('public'));

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, 'public/images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'root', 
  database: 'agent'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1); // Exit process if unable to connect to the database
  }
  console.log('MySQL connected...');
});

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Define your uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the file naming convention
  }
});

const upload = multer({ storage: storage });

const saveAgentToDatabase = (agentData) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO agentlist SET ?';
    db.query(sql, agentData, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

app.post('/addagent', upload.single('file'), (req, res) => {
  const { name, username, email, city, sector, phone, experience, listings, languages, transactions, reraRegnNo, aadhaarNo, panNo } = req.body;
  const imageUrl = req.file ? req.file.filename : null;

  if (!name || !username || !email || !city || !sector || !phone) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  const agentData = { name, username, email, city, sector, phone, reraRegnNo, aadhaarNo, panNo, imageUrl };
  console.log('Agent data to be saved:', agentData);

  saveAgentToDatabase(agentData)
    .then(() => res.json({ message: 'User added successfully' }))
    .catch(error => {
      console.error('Database error:', error);
      res.status(500).json({ error: 'An error occurred while saving the agent data' });
    });
});

// Get all agents
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM agentlist';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Get all locations
app.get('/location', (req, res) => {
  const sql = 'SELECT * FROM location';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Get all localities
app.get('/localities', (req, res) => {
  const city = req.query.city;
  const sql = 'SELECT * FROM localities WHERE city = ?';
  db.query(sql, [city], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Get top agents by transactions
app.get('/topagents', (req, res) => {
  const sql = 'SELECT transactions, name FROM agentlist ORDER BY transactions DESC LIMIT 10';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// Get filtered agents
app.get('/agents', (req, res) => {
  const { city, sector, rent, newProperty, resale } = req.query;

  // Initialize arrays to store conditions and parameters
  let conditions = [];
  let queryParams = [city, sector];

  // Check each filter parameter and include only those with value 1
  if (rent === '1') {
    conditions.push('rent = ?');
    queryParams.push(rent);
  }
  if (newProperty === '1') {
    conditions.push('newProperty = ?');
    queryParams.push(newProperty);
  }
  if (resale === '1') {
    conditions.push('resale = ?');
    queryParams.push(resale);
  }

  // Construct the SQL query based on included conditions
  let sql = 'SELECT * FROM agentlist WHERE city = ? AND sector = ?';
  if (conditions.length > 0) {
    sql += ' AND ' + conditions.join(' AND ');
  }

  console.log(sql, queryParams);

  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    console.log(results);
    res.status(200).json(results);
  });
});


// Get a single agent by ID
app.get('/agents/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM agentlist WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Agent not found');
    }
    res.status(200).json(result[0]);
  });
});

app.post('/updateagent/:id', upload.single('file'), (req, res) => {
  const agentIndex = agents.findIndex(a => a.id === req.params.id);
  if (agentIndex > -1) {
    const agent = agents[agentIndex];
    const updatedAgent = {
      ...agent,
      ...req.body,
      file: req.file ? req.file.path : agent.file
    };
    agents[agentIndex] = updatedAgent;
    res.json({ message: 'Agent updated successfully', agent: updatedAgent });
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

app.listen(3030, () => {
  console.log('Server running on port 3030');
});
