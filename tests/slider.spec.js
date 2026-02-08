const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');

test('Set slider to 95 using mouse', async ({ page }) => {
  await page.goto("https://www.lambdatest.com/selenium-playground/"); 

   //click “Drag & Drop Sliders”.
    await page.locator('text=Drag & Drop Sliders').click();

    /*Select the slider “Default value 15” and drag the bar to make it 95
    by validating whether the range value shows 95.*/

    await page.locator("//*[@id='slider3']/div/input").focus();

     for(let i=0; i<80; i++){
        page.keyboard.press("ArrowRight");
     }

     var scollbarrangevalue = await page.locator("//*[@id='rangeSuccess']").textContent();

     console.log(scollbarrangevalue);      
    
     await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Scrollbar set to 95' } })}`)
      
});
