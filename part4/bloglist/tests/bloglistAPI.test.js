import {test, after, describe, beforeEach, before} from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../model/Blog.js'
import User from '../model/User.js'

const api = supertest(app)

let token, authHeader, userId;

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

before(async () => {
  await User.deleteMany({})

  const user = await api.post('/api/users')
  .send({username: 'root', name: 'superuser', password: 'root123'})

  const userLoginInfo = {username: 'root', name: 'superuser', password: 'root123'}
  const result = await api.post('/api/login')
  .send(userLoginInfo)

  token = result.body.token
  authHeader = `Bearer ${token}`
  userId = user._id
})

//TEST Database changes before each test
beforeEach(async ()=> {
  await Blog.deleteMany({})
  for(const blog of blogs){
    await api.post('/api/blogs')
    .send(blog)
    .set('Authorization', authHeader)
  }
})

//TESTS
describe('GET requests:',()=>{
  test('Get request is returned as json', async ()=> {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  //test('If a specific author is present in the output:', async ()=>{})
  test('If the correct amount of blogs are returned', async ()=>{
    const result = await api.get('/api/blogs')
    assert.strictEqual(result.body.length, blogs.length)
  })

  test('If the \'id\' parameter is correctly attributed', async ()=>{
    const result = await api.get('/api/blogs')
    for(const blog of (result.body)){
      assert.strictEqual('id'in blog, true)
    }
  })
})

describe('POST requests:',()=>{
  test('POST request is successful and number of entries are increased by 1', async ()=>{
    const testBlog = {
      title: "Testing APIs",
      author: "Noname",
      url: "https://example.com/",
      likes: 7,
      user: userId
    }
    await api.post('/api/blogs')
      .send(testBlog)
      .set('Authorization', authHeader)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlog = await api.get('/api/blogs')
    assert.strictEqual(newBlog.body.length, blogs.length + 1)
  })

  test('POST request with empty input gives status code 400', async ()=> {
    const testBlog = {}
    await api.post('/api/blogs')
    .send(testBlog)
    .set('Authorization', authHeader)
    .expect(400)
  })

  test('POST request with some keys in object missing', async () => {
    const testBlog = {
      likes: 7
    }
    await api.post('/api/blogs')
    .send(testBlog)
    .set('Authorization', authHeader)
    .expect(400)
    .expect({ error: 'Missing Input!' })
  })

  test('POST request with missing \'likes\' values defaults to 0', async ()=>{
    const testBlog = {
      title: "Testing APIs",
      author: "Noname",
      url: "https://example.com/",
    }

    const result = await api.post('/api/blogs')
    .send(testBlog)
    .set('Authorization', authHeader)
    
    assert.strictEqual(result.body.likes,0)
  })

  //Wrong Authorization
  test('POST request with wrong Authorization', async () => {
    const testBlog = {
      title: "Testing APIs",
      author: "Noname",
      url: "https://example.com/",
      likes: 7,
      user: userId
    }

    await api.post('/api/blogs')
    .send(testBlog)
    .set('Authorization', "Bearer Thisiscompletelywrong")
    .expect(401)
    .expect({ error: 'invalid token' })
  })
  //No Authorization
  test('POST request without any Authorization Header', async () => {
    const testBlog = {
      title: "Testing APIs",
      author: "Noname",
      url: "https://example.com/",
      likes: 7,
      user: userId
    }

    await api.post('/api/blogs')
    .send(testBlog)
    .expect(401)
    .expect({ error: 'invalid token' })
  })
})



after(async ()=> {
  await mongoose.connection.close()
})




// blogs = [
//   {
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     user: user._id
//   },
//   {
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     user: user._id
//   },
//   {
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     user: user._id
//   },
//   {
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     user: user._id
//   },
//   {
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     user: user._id
//   },
//   {
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     user: user._id
//   }  
// ]