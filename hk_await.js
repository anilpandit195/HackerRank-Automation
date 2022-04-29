const puppeteer = require("puppeteer");
const mail = "kageh16441@svcache.com"
const passwd = "Pandit@195"
const code = require('./code');

(async function () {
    let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
    let page = await browser.newPage();
    await page.goto("https://www.hackerrank.com/");
    await waitAndclick('ul.menu a', page);
    await page.waitForSelector('div a.fl-button');
    await page.evaluate(function () {
        let btsn = document.querySelectorAll("div a.fl-button");
        btsn[1].click();
        return;
    });
    await page.waitForSelector('#input-1');
    await page.type("#input-1", mail, { delay: 100 });
    await page.type("#input-2", passwd, { delay: 100 });
    await waitAndclick('[data-analytics="LoginPassword"]', page);
    await waitAndclick('[data-automation="algorithms"]', page);
    await page.waitForSelector(".filter-group");
    await page.evaluate(function () {
        let allDivs = document.querySelectorAll(".filter-group");
        let div = allDivs[3];
        let clickSelector = div.querySelector(".ui-checklist-list-item input");
        clickSelector.click();
        return;
    });
    await page.waitForSelector(".challenges-list .js-track-click.challenge-list-item");
    let questionsArr = await page.evaluate(function () {
        let arr = [];
        let aTags = document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        for (let i = 0; i < aTags.length; i++) {
            let link = aTags[i].href;
            console.log(link)
            arr.push(link);

        } return arr;
    })
    for (let i = 0; i < questionsArr.length; i++) {
        await questionSolver(questionsArr[i], code.answers[i], page);
    }
})();

async function waitAndclick(selector, page) {
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function questionSolver(question, answer, page) {
    await page.goto(question);
    await waitAndclick('.checkBoxWrapper input', page);
    await waitAndclick('.ui-tooltip-wrapper textarea', page);
    await page.type('.ui-tooltip-wrapper textarea', answer);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('X');
    await page.keyboard.up('Control');
    await waitAndclick('.monaco-editor.no-user-select.vs', page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('V');
    await page.keyboard.up("Control");
    await waitAndclick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page);
}