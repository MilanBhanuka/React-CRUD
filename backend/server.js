const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host:'localhost',
  user:'react',
  password: '',
  database: 'crud'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ message: "Error fetching students" });
    }
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required" });
  }

  const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
  const values = [name, email];
  
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).json({ message: "Error adding student" });
    }
    return res.status(201).json({ message: "Student added", studentId: data.insertId });
  });
});


app.post("/update/:id", (req, res) => {
      const sql = "UPDATE student SET Name = ?, Email = ? WHERE id = ?";
      const values = [
            req.body.name, 
            req.body.email
      ]
      const id = req.params.id;

      db.query(sql, [...values, id], (err, data) => {
            if(err) {
                  console.error('Error updating student:', err);
                  return res.status(500).json({ message: "Error updating student" });
            }
            return res.status(200).json({ message: "Student updated" });
      });

});

app.delete("/student/:id", (req, res) => {
      const sql = "DELETE FROM student WHERE id = ?";
      const id = req.params.id;

      db.query(sql, [id], (err, data) => {
            if(err) {
                  console.error('Error deleting student:', err);
                  return res.status(500).json({ message: "Error deleting student" });
            }
            return res.status(200).json({ message: "Student deleted" });
      });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
