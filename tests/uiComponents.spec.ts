import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com') //simulating key strokes
        await usingTheGridEmailInput.clear()

        //slower typing
        await usingTheGridEmailInput.pressSequentially('test3@test3.com' , {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test3@test3.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test3@test3.com')
    })

    test('Radio button', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        //await usingTheGridForm.getByLabel('Option 1').check() -> won't work like this because it is visually hidden, so it has to be forced
        await usingTheGridForm.getByLabel('Option 1').check({force:true})
        //generic assertion
        const radioStatus1 = await usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(radioStatus1).toBeTruthy()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force:true})
        //locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked()

        expect(radioStatus1).toBeFalsy
    })
})

test('Checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})
    //.check() wouldn't work because checkbox is already checked, so it should be uncheck() - click() doesn't check if checkbox is already checked or not, it just clicks on it
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
    await page.getByRole('checkbox', {name: "Show toast with icon"}).uncheck({force: true})

    const allCheckboxes = page.getByRole('checkbox')

    for(const box of await allCheckboxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

    for(const box of await allCheckboxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('Lists and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // if the list has a 'UL' tag
    page.getByRole('listitem') // if the list has a 'LI' tag

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await expect((await optionList.all()).length).toBe(4)
    
    await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color !="Corporate")
            await dropDownMenu.click()
    }

})