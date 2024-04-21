import {test} from '@playwright/test'

//hooks
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/') //response is 'promise' so we have to use 'await' in order to execute it successfuly
    //it will be executed before every suite

})

//single test

test.describe('suite1',() =>{ //skip and only works with test suite too

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    //it will be executed only before tests written inside this suite

    test('the first test', async ({page}) => {
    await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({page}) => {
    await page.getByText('Datepicker').click()
    })

})

test.describe.skip('skippedSuite',() =>{
    //throws error because 'Form Layouts' and 'Datepicker' does not exist under 'Charts'

    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })

    test('the first test', async ({page}) => {
    await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({page}) => {
    await page.getByText('Datepicker').click()
    })

})








//multiple tests inside one test suite and it can contain hooks (beforeEach, afterEach, beforeAll, afterAll)
/*
test.describe('test suite 1', () => {
    test.beforeEach(async({page}) =>{

    })

    test('the first test', () => {

    })

    test('the first test', () => {

    })

    test('the first test', () => {

    })

})
*/
