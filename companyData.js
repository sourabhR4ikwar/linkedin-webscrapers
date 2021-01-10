const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

let username = "LinkedIn_Username";
let password = "LinkedIn_Password"
let companies;
// configure slot here
var slot = 9; // 0 - 9

fs.readFile('companyRefUpdated.json',(err, data) => {
    if(err) throw err;
    let jsonData = JSON.parse(data);
    companies = jsonData.companyData;
    scrapeCompany('https://www.linkedin.com/directory/companies/', companies);
});

async function scrapeCompany(url, companies){
    var companyData=[], browser;
    browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    console.log('[Browser] opening browser');
    await page.goto(url, { waitUntil: 'networkidle2'});
    console.log('[Browser] clicking on Signin');
    await page.waitFor('body > main > div > div > form.join-form > section > p > a');
    let signin = await page.$x('/html/body/main/div/div/form[2]/section/p/a');
    await signin[0].click();
    console.log('[Browser] Signing in');
    await page.waitFor('input[name="session_key"]');
    await page.type('input[name="session_key"]', username, { delay: 50 });
    await page.type('input[name="session_password"]', password, { delay: 50 });
    let loginButton = await page.$x('//*[@id="login-submit"]');
    await loginButton[0].click();
    await page.waitFor('#seo-dir > div > div.page-title > h1');
    console.log('[Browser] Start Scraping');
    for(let j=50*slot;j<(50*slot)+50;j++){
        await page.goto(companies[j].address, { waitUntil: 'networkidle2'});
        await page.waitFor('.org-top-card-summary__title.t-24.t-black.t-bold.truncate > span');
        let data = await page.evaluate(()=> {
            let imageUrl = null;
            let name = null;
            let website = null;
            let no_of_employees = null;
            let industry = null;
            if(document.querySelector('img.lazy-image.ember-view.org-top-card-primary-content__logo')){
                imageUrl = document.querySelector('img.lazy-image.ember-view.org-top-card-primary-content__logo').src;
            }
            if(document.querySelector('.org-top-card-summary__title.t-24.t-black.t-bold.truncate > span')){
                name = document.querySelector('.org-top-card-summary__title.t-24.t-black.t-bold.truncate > span').innerText;
            }
            if(document.querySelector('.link-without-visited-state.ember-view > span')){
                website = document.querySelector('.link-without-visited-state.ember-view > span').innerText
            }
            if(no_of_employees = document.querySelector('.org-about-company-module__company-size-definition-text.t-14.t-black--light.mb1.fl')){
                no_of_employees = document.querySelector('.org-about-company-module__company-size-definition-text.t-14.t-black--light.mb1.fl').innerText.split(" ")[0]
            }
            if(document.querySelector('.org-page-details__definition-text.t-14.t-black--light.t-normal:nth-of-type(2)')){
                industry = document.querySelector('.org-page-details__definition-text.t-14.t-black--light.t-normal:nth-of-type(2)').innerText;
            }
            return {
                    name,
                    imageUrl,
                    website,
                    no_of_employees,
                    industry
                };
        });
        console.log(data,'\n[Finished] ',j);
        companyData.push(data);
    }
    

    let nameOfFile = 'companyData'+(slot+1)+'.json';
    fs.writeFile(path.join('ScrapedData',nameOfFile), JSON.stringify(companyData), function (err) {
        if (err) throw err;
        console.log('saved! ',nameOfFile);
    });
    await browser.close();
}

