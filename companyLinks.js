const puppeteer = require('puppeteer');
const fs = require('fs');

let username = "LinkedIn_Email";
let password = "LinkedIn_Password"

async function scrapeCompany(url){
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2'});
    await page.waitFor('body > main > div > div > form.join-form > section > p > a');
    let signin = await page.$x('/html/body/main/div/div/form[2]/section/p/a');
    await signin[0].click();
    await page.waitFor('input[name="session_key"]');
    await page.type('input[name="session_key"]', username, { delay: 50 });
    await page.type('input[name="session_password"]', password, { delay: 50 });
    let loginButton = await page.$x('//*[@id="login-submit"]');
    await loginButton[0].click();
    await page.waitFor('#seo-dir > div > div.page-title > h1');
    let data = await page.evaluate(()=> {
        let list = document.querySelectorAll('.content > a');
        let companyData = []
        for(let i =0; i< list.length;i++){
            console.log({ name: list[i].innerHTML, address: list[i].href });
            companyData.push({ name: list[i].innerHTML, address: list[i].href });
        }
        return {
            companyData
        };
    });
    console.log(data);
    fs.writeFile('companyRef.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    await browser.close();
}

scrapeCompany('https://www.linkedin.com/directory/companies/');