const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../src/app')
const Blog = require('../../src/models/blog')
const blog = require('../../src/models/blog')
const api = supertest(app)

beforeEach(async () => {
    await initBlogs()
})

const API_PATH = '/api/blogs'
describe('get all blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get(API_PATH)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        let result = await api
            .get(API_PATH)
        expect(result.body).toHaveLength(initialBlogs.length)
    })

    test('blog has id defined', async () => {
        let result = await api
            .get(API_PATH)
        console.log(result.body)
        expect(result.body[0].id).toBeDefined()
    })

})

describe('save blog', () => {

    const newBlog =
    {
        "title": "test3",
        "author": "joonas3",
        "url": "sss3",
        "likes": 2
    }

    test('new blog is persisted', async () => {
        await api
        .post(API_PATH)
        .send(newBlog)
        .expect(201)

        let blogs = await Blog.find({})
        expect(blogs).toHaveLength(initialBlogs.length + 1)
        
    })

})

describe('delete blog', () => {

    test('blog is deleted', async () => {
        let blogs = await Blog.find({})
        expect(blogs).toHaveLength(initialBlogs.length)

        let toBeDeletedBlog = blogs[0]

        await api
        .delete(`${API_PATH}/${toBeDeletedBlog.id}`)
        .expect(200)

        blogs = await Blog.find({})
        let deletedBlog = blogs.some(blog => {blog.id === toBeDeletedBlog.id})
        expect(blogs).toHaveLength(initialBlogs.length - 1)
        expect(deletedBlog).toBeFalsy()
    })

})

describe('update blog', () => {

    let updatedBlog =
    {
        "title": "updatesTitle",
        "author": "updatedAuthor",
        "url": "updatedUrl",
        "likes": 666
    }

    test('blog is updated', async () => {
        let blogs = await Blog.find({})
        expect(blogs).toHaveLength(initialBlogs.length)

        let updatedBlogId = blogs[0].id

        await api
        .put(`${API_PATH}/${updatedBlogId}`)
        .send(updatedBlog)
        .expect(200)
 
        let blog = await Blog.findById(updatedBlog.id)
        // something wrong with this: expect(blog).toMatchObject(updatedBlog)
        expect(blog.title).toBe(updatedBlog.title)
        expect(blog.author).toBe(updatedBlog.author)
        expect(blog.url).toBe(updatedBlog.url)
        expect(blog.likes).toBe(updatedBlog.likes)
    })

})



const initialBlogs = [
    {
        "title": "test",
        "author": "joonas",
        "url": "sss",
        "likes": 2,
    },
    {
        "title": "test2",
        "author": "joonas2",
        "url": "sss2",
        "likes": 1,
    },
]

const initBlogs = async () => {
    await Blog.deleteMany({})
    let blog1 = new Blog(initialBlogs[0])
    await blog1.save()
    let blog2 = new Blog(initialBlogs[1])
    await blog2.save()
}

