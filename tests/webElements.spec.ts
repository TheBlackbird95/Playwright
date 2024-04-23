import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').click() //throws an error because there are many elements with this tag name
        // we can write .first.click() in order to click on the first element with tag 'input'

    //by ID
    page.locator('#inputEmail1')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by Class value
    page.locator('.shape-rectangle') //it will find all elements that have 'shape-rectangle' inside their class
        //whole class of element is usually much longer, for example "input-full-width size-medium status-basic shape-rectangle nb-transition"

    //by full Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle[nbinput]') //it can contain as many selecetors in one line as we want, but they must no be separated

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click() //looking for a textbox that has a name/text 'Email'
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click() //looking for element that has label with text 'Email'

    await page.getByPlaceholder('Jane Doe').click() //looking for element that has placeholder 'Jane Doe'

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click() //TestID can be defined by ourselves in the source code - ONLY FOR PLAYWRIGHT
        //data-testid="SignIn" added into line 48 in form-layouts.component.html

    await page.getByTitle('IoT Dashboard').click()

})

test('Locating child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click() //looks for Option 1 text, inside nb-radio, which is inside nb-card element
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() //works the same but longer code, less used method

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click() //locators can be combined - regular and user facing

    await page.locator('nb-card').nth(3).getByRole('button').click() //least used method - index method
})