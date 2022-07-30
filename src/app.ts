import express from 'express'
import { createConnection } from 'mysql'
import type Reservation from '../src/interfaces/Reservation'
import cors from 'cors'

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cors())

const conn = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hotel_booking',
})

conn.connect(err => {
  if (err) throw err
  console.log('Server connected to MySql')
})

app.get('/reservations', (req, res) => {
  const cmd = 'SELECT * FROM reservations'
  conn.query(cmd, (err, fields: Array<Reservation>) => {
    if (err) throw err
    res.json(
      fields.map(
        field =>
          (field = {
            ...field,
            roomPhoto: field.roomPhoto.toString('base64'),
          })
      )
    )
  })
})

app.post('/reservations', (req, res) => {
  const { roomPhoto, ...reservation }: Reservation = req.body
  const cmd = 'INSERT INTO reservations SET ?'

  conn.query(
    cmd,
    { roomPhoto: Buffer.from(<string>roomPhoto, 'base64'), ...reservation },
    err => {
      if (err) throw err
      res.end()
    }
  )
})

app.delete('/reservations/:id', (req, res) => {
  const id = req.params.id
  const cmd = 'DELETE FROM reservations WHERE id = ?'

  conn.query(cmd, id, err => {
    if (err) throw err
    res.end()
  })
})

app.put('/reservations/:id', (req, res) => {
  const { roomPhoto, ...reservation }: Reservation = req.body
  const id = req.params.id
  const cmd = 'UPDATE RESERVATIONS SET ? WHERE id = ?'

  conn.query(
    cmd,
    [{ roomPhoto: Buffer.from(<string>roomPhoto, 'base64'), ...reservation }, id],
    err => {
      if (err) throw err
      res.end()
    }
  )
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
