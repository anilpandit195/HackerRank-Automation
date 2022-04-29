const puppeteer = require("puppeteer");
const mail = "kageh16441@svcache.com"
const passwd = "Pandit@195"
const code = require('./code');

let browser = puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });
let page;
browser.then(function (browser) {
    console.log("browser opened")
    let newpage = browser.newPage();
    return newpage;
}).then(function (pageinstans) {
    console.log("new page opened")
    page = pageinstans;
    let url = page.goto("https://www.hackerrank.com/");
    return url;
}).then(function (wait) {
    console.log("HackerRank opened");
    let waitpromise = page.waitForSelector("ul.menu a")
    return waitpromise;
}).then(function (login) {
    console.log("selector selected");
    let loginpromise = page.click("ul.menu a")
    return loginpromise;
}).then(function () {
    let waitForSelector = page.waitForSelector("div a.fl-button");
    return waitForSelector;
}).then(function () {
    console.log("waited for selector")
    let clickproimises = page.evaluate(function () {
        let btsn = document.querySelectorAll("div a.fl-button");
        btsn[1].click();
        return;
    });
    return clickproimises;
}).then(function () {
    let waitForSelector = page.waitForSelector("#input-1");
    return waitForSelector;
}).then(function () {
    let typepromises = page.type("#input-1", mail, { delay: 100 });
    return typepromises;
}).then(function () {
    let waitForSelector = page.waitForSelector("#input-2");
    return waitForSelector;
}).then(function () {
    let typepromises = page.type("#input-2", passwd, { delay: 100 });
    return typepromises;
}).then(function () {
    let loginpromise = page.click('[data-analytics="LoginPassword"]');
    return loginpromise;
}).then(function () {
    let waitForSelector = page.waitForSelector('[data-automation="algorithms"]');
    return waitForSelector;
}).then(function () {
    let algropromis = page.click('[data-automation="algorithms"]');
    return algropromis;
}).then(function () {
    let waitForSelector = page.waitForSelector(".ui-checklist-list-item input");
    return waitForSelector;
}).then(function () {
    let clickpromise = page.evaluate(function () {
        let warmuppromise = document.querySelectorAll(".ui-checklist-list-item input");
        warmuppromise[8].click();
        return;
    })
    return clickpromise;
}).then(function () {
    let waitForSelector = page.waitForSelector(".challenges-list .js-track-click.challenge-list-item");
    return waitForSelector;
}).then(function () {
    let arrpromise = page.evaluate(function () {
        let arr = [];
        let aTags = document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        for (let i = 0; i < aTags.length; i++) {
            let link = aTags[i].href;
            console.log(link)
            arr.push(link);

        } return arr;
    })
    return arrpromise;
}).then(function (questionsArr) {
    let quationpromise = quationSolver(questionsArr[0], code.answers[0]);
    for (let i = 1; i < questionsArr.length; i++) {
        quationpromise = quationpromise.then(function () {
            let nextquation = quationSolver(questionsArr[i], code.answers[i]);
            return nextquation;
        })
    }
    return quationpromise;

}).then(function () {
    console.log("all warmup quation submited");
})
function quationSolver(quation, answer) {
    return new Promise(function (resolve, reject) {
        let linkpromise = page.goto(quation);
        linkpromise.then(function () {
            return waitandclick('.checkbox-wrap input');
        }).then(function () {
            return waitandclick('.ui-tooltip-wrapper textarea');
        }).then(function () {
            let typepromise = page.type('.ui-tooltip-wrapper textarea', answer);
            return typepromise;
        }).then(function () {
            let holdcontrole = page.keyboard.down("Control");
            return holdcontrole;
        }).then(function () {
            let pressA = page.keyboard.press("A");
            return pressA;
        }).then(function () {
            let pressX = page.keyboard.press("X");
            return pressX;
        }).then(function () {
            let upcontrol = page.keyboard.up("Control");
            return upcontrol;
        }).then(function () {
            return waitandclick('.monaco-editor.no-user-select.vs');
        }).then(function () {
            let holdcontrole = page.keyboard.down("Control");
            return holdcontrole;
        }).then(function () {
            let pressA = page.keyboard.press("A");
            return pressA;
        }).then(function () {
            let pressV = page.keyboard.press("V");
            return pressV;
        }).then(function () {
            let upcontrol = page.keyboard.up("Control");
            return upcontrol;
        }).then(function () {
            console.log("code past");
            return waitandclick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');
        }).then(function () {
            console.log("quation submited");
            resolve();
        })

    })
}


function waitandclick(selector) {
    return new Promise(function (resolve, reject) {
        let waitpromise = page.waitForSelector(selector);
        waitpromise.then(function () {
            let clickpromise = page.click(selector);
            return clickpromise;
        }).then(function () {
            resolve();
        });
    })
}