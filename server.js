const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const PORT = 3000;
const app = express();

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "kniznica_db",
  connectionLimit: 5
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => res.redirect("/knihy.html"));

app.get("/api/knihy", (req, res) => {
  db.query("SELECT id, nazov, autor, rok, cena FROM knihy", (error, riadky) => {
    if (error) return res.status(500).send("Chyba SQL");
    res.json(riadky);
  });
});

app.post("/api/knihy", (req, res) => {
  const { nazov, autor, rok, cena } = req.body;
  const sql = "INSERT INTO knihy (nazov, autor, rok, cena) VALUES (?, ?, ?, ?)";

  db.query(sql, [nazov, autor, rok, cena], error => {
    if (error) return res.status(500).send("Chyba SQL");
    res.send("Kniha pridana");
  });
});


app.delete("/api/knihy/:id", (req, res) => {
  const sql = "DELETE FROM knihy WHERE id = ?";
  db.query(sql, [req.params.id], (error, info) => {
    if (error) return res.status(500).send("Chyba SQL");
    if (info.affectedRows === 0) return res.sendStatus(404);
    res.send("Kniha odstranena");
  });
});


app.patch("/api/knihy/:id", (req, res) => {
  const { nazov, autor, rok, cena } = req.body;
  if (!nazov || !autor || !Number.isInteger(rok) || !Number.isFinite(cena))
    return res.status(400).send("Neplatne udaje");

  const sql = "UPDATE knihy SET nazov = ?, autor = ?, rok = ?, cena = ? WHERE id = ?";
  db.query(sql, [nazov, autor, rok, cena, req.params.id], (error, vysledok) => {
    if (error) return res.status(500).send("Chyba SQL");
    if (!vysledok.affectedRows) return res.sendStatus(404);
    res.send("Kniha ulozena");
  });
});


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => console.log("Aplikácia beží: http://localhost:" + PORT));