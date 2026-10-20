import { beforeEach, expect, test, describe } from '@playwright/test'
import { loginWith } from './helper.js'

describe('Blog app', () => {

  beforeEach(async ({page}) => {
    await page.goto('/')
  })
  
  describe('Login', () => {
    test('Login is successful with correct credentials', async ({page}) => {
      await page.getByRole('link',{name: 'Login'}).click()
      
      await page.getByLabel('Username:').fill('root')
      await page.getByLabel('Password:').fill('west12345')
      await page.getByRole('button',{name: 'Login'}).click()


      await expect(page.getByText('User: "superuser" is logged in')).toBeVisible()
    })

    test('Login fails with the wrong credentials', async ({page}) => {
      await page.getByRole('link',{name: 'Login'}).click()
      await page.getByLabel('Username:').fill('root')
      await page.getByLabel('Password:').fill('w')
      await page.getByRole('button',{name: 'Login'}).click()


      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({page}) => {
      await loginWith(page,'root','west12345')
      await expect(page.getByText('Login Successful')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('link',{name: 'Create Blogs'}).click()

      // await page.getByRole('button',{name: 'Create Blog'}).click()
      await page.getByLabel('Title:').fill('Nonsense!')
      await page.getByLabel('Author:').fill('Mozambi')
      await page.getByLabel('URL:').fill('https://www.giovani.com/')
      await page.getByRole('button',{name: 'Create'}).click()
      // A new blog '1' by 1 added.
      await expect(page.getByText(`A new blog 'Nonsense!' by Mozambi added.`)).toBeVisible()
    })

    test('blog can be liked', async ({page}) => {
      await page.getByRole('link',{name: 'Blogs'}).first().click()
      page.locator('.bloglist-item-heading').first().click()
      const likeCountLocator = page.getByTestId('like-count')
      const likesTextBefore =  Number(await likeCountLocator.textContent())
      await page.getByRole('button',{name: 'Like'}).first().click()
      await expect(likeCountLocator).toHaveText(String(likesTextBefore + 1));
    })

    test.only('Delete button works', async ({page}) => {
      await page.getByRole('link',{name: 'Blogs'}).first().click()
      const blogHeading = page.locator('.bloglist-item-heading').first()
      blogHeading.click()

      const blogText = blogHeading.textContent()
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      await page.getByRole('button',{name: 'Delete'}).click()
      await expect(page.locator(`text=${blogText}`)).not.toBeVisible()
    })

    test('Delete button is only shown to the owner', async ({page}) => {
      await page.getByRole('button',{name: 'Show'}).first().click()
      const deleteBtn = page.getByRole('button',{name: 'Delete'})

      //Check whether Delete button is Visible
      await expect(deleteBtn).toBeVisible()
      //Logout
      await page.getByRole('button',{name: 'Logout'}).first().click()
      //Try to find DeleteBtn Again
      await expect(deleteBtn).not.toBeVisible()
    })

    // test('Blogs are organised by count in descending order', async ({page}) => {
    //   const showButtons = page.getByRole('button',{name: 'Show'})
    //   const totalButtons = await showButtons.count()
    //   let check = null

    //   for(let i = 0; i < totalButtons; i++)
    //   {
    //   await showButtons.nth(i).click()
    //   const blogLike = Number(await page.getByTestId('like-count').textContent())

    //   if(check !== null)
    //     expect(blogLike).toBeLessThan(check)

    //   check = blogLike
    //   await page.getByRole('button',{name: 'Hide'}).click()
    //   }
    // })
  })
})