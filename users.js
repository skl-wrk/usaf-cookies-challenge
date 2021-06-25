const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')


// Set a cookie when routed to /login with name.
// If a cookie is present with a name key, "Welcome {name}! when the user routes to /hello".

app.use(cookieParser())

// At http://localhost:3000/login create a query param
  // URL ex. http://localhost:3000/login?name=Joe Shmo
app.get('/login', (req, res) => {
  const name = req.query.name
  if (name) {
      res.cookie("name", name)
          .send("Query submitted, go to http://localhost:3000/hello")
  }
  res.status(404).end()
  const cookies = Object.entries(req.cookies)
  console.log("cookies: ", cookies)
})

app.get('/hello', (req, res) => {
  const userToGreet = req.cookies.name
  console.log("Logged in: ", userToGreet)
  if (userToGreet) {
      res.send(`Hello, ${userToGreet}!`)
  } else {
      res.send(`Please log in on http://localhost:3000/login`)
  }
  res.status(403).end()
})


app.listen(3000, () => { console.log(`Cookies Learn Challenge on PORT=3000`) })