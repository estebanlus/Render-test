const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
  console.log('Execution require more arguments')
  console.log('To fetch phonebook: node mongo.js yourpassword')
  console.log('To add an entry: node mongo.js yourpassword name number')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://estebanlus:${password}@cluster0.kbcrfhc.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneBookSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}