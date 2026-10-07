//Write tests to checks everything related to users

import {test, after, describe, beforeEach} from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import User from '../model/User.js'

const api = supertest(app)

const users = [{
        username: 'mantis',
        name: 'romeira',
        password: 'headshot'
      }]

beforeEach(async ()=>{
  await User.deleteMany({})

  for(const user of users){
    const newUser = new User(user)
    await newUser.save()
  }
})

//TESTS
describe("User database tests:", () => {

  describe('GET requests', () => {})
  
  describe('POST requests:', () => {

    test('Empty request', async ()=>{
      await api.post('/api/users')
      .send({})
      .expect(400)
    })

    test('request with missing keys in object', async () => {
      const testUser = { username: "horse", password: 'oldtownroad' }

      await api.post('/api/users')
      .send(testUser)
      .expect(400) // different error messages based on what values are missing
    })

    test('request with a duplicate username existing in database', async () => {
      const testUser = {
        username: 'mantis',
        name: 'romeira',
        password: 'headshot'
      }

      await api.post('/api/users')
      .send(testUser)
      .expect(400)
      .expect({"error": "expected `username` to be unique"})
    })

    test('Password in less than equal to 3 characters', async () => {
      const testUser = {
        username: 'horse',
        name: 'bojack',
        password: 'old'
      }

      await api.post('/api/users')
      .send(testUser)
      .expect(400)
      .expect({ error: 'Password must be greater than 3 characters.' })
    })
    test('request with the correct data', async () => {
      const testUser = {
        username: 'horse',
        name: 'bojack',
        password: 'oldtownroad'
      }

      await api.post('/api/users')
      .send(testUser)
      .expect(201)

      const usersInDb = await api.get('/api/users')
      assert.strictEqual(usersInDb.body.length, users.length + 1)
    })
  })

})


after(async ()=> {
  await mongoose.connection.close()
})