import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering Ajax Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()
    /*
        Works fine with default timeout
        If default timeout is changed inside playwright.congig.ts file, line 13
    */
    //const text = await successButton.textContent()

    //await successButton.waitFor({state: "attached"})
    //const text = await successButton.allTextContents() //it doesn't wait any, so we can manually add wait time for functions that doesn't have any wait time
    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) //assertation have 5sec wait time and also can be overriden
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //1st __wait for element
    //await page.waitForSelector('.bg-success')

    //2nd __wait for particular response -> checking API / backend / background / network tab
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //3th _-wait for network calls to be completed (NOT RECOMMENDED) - it may stuch if network is falsy
    await page.waitForLoadState('networkidle')

    //4th hardoced wait
    //await page.waitForTimeout(20000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
    //test.setTimeout(3000)

    test.slow() //increases default timeouts 3x
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})
    //test timeout changed in playwright.config.ts line 13 -> can be overriden inside test body - line 46
    //Global timeout added in playwright.config.ts line 15
    //action timeout added in playwright.config.ts line 41
    //navigation timeout added in playwright.config.ts line 42
    //locator assertions timeout added in playwright.config.ts line 17-21

    //timeouts can be overriden if we provide a timeout for the function in brackets

    //timeouts can be changed for whole suite if added as 2nd parameter inside beforeEach - lines 3 and 6
})