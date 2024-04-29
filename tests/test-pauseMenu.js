const puppeteer = require('puppeteer');
const core=require('@actions/core')


async function testEscapeButton() {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:8000/index.html');

    
    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Start is not visible on main menu!";
    }

    //Click the start button
    element.click();

    //Check and ensure the game state did NOT change
    if (GAMESTATE != 'PLAYING') {
        throw "Game state changed when the title header was clicked, NOT MENU!";
    }

    //Disposes properly, ready for another element to be grabbed
    element.dispose();

    //Now press escape for pause screen
    await page.keyboard.press('Escape');

    //Check for the the state change
    if (GAMESTATE != 'PAUSE') {
        throw "Game state did not change to pause when paused!";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testPauseHeader() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Start is not visible on main menu!";
    }

    //Click the title as it is a button
    element.click();

    //Check and ensure the game state did NOT change
    if (GAMESTATE != 'PLAYING') {
        throw "Game state changed when the title header was clicked, NOT MENU!";
    }

    //Disposes properly, ready for another element to be grabbed
    element.dispose();

    //Now press escape for pause screen
    await page.keyboard.press('Escape');

    //Check for the the state change
    if (GAMESTATE != 'PAUSE') {
        throw "Game state did not change to pause when paused!";
    }

    //Now can check for the resume button
    element = await page.waitForSelector('button[name="pauseHeader"]');

    //Check for visibility
    if (!element.isVisible()) {
        throw "Resume button is not visible on pause screen!";
    }

    element.click();


    //Now check for game state change
    if (GAMESTATE != 'PAUSE') {
        throw "GAMESTATE is not PAUSE when the header is clicked in pause menu!";
    }

    //Now check for button visiblity
    if (!element.isVisible()) {
        throw "Header is NOT visible when paused!";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testExitButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Start is not visible on main menu!";
    }

    //Click the title as it is a button
    element.click();

    //Check and ensure the game state did NOT change
    if (GAMESTATE != 'PLAYING') {
        throw "Game state changed when the title header was clicked, NOT MENU!";
    }

    //Disposes properly, ready for another element to be grabbed
    element.dispose();

    //Now press escape for pause screen
    await page.keyboard.press('Escape');

    //Check for the the state change
    if (GAMESTATE != 'PAUSE') {
        throw "Game state did not change to pause when paused!";
    }

    //Now can check for the resume button
    element = await page.waitForSelector('button[name="pauseExit"]');

    //Check for visibility
    if (!element.isVisible()) {
        throw "Exit button is not visible on pause screen!";
    }

    element.click();


    //Now check for game state change
    if (GAMESTATE != 'MENU') {
        throw "GAMESTATE is not MENU when exit is clicked in pause menu!";
    }

    //Now check for button visiblity
    if (element.isVisible()) {
        throw "The pause menu exit button is visible when on the main menu!";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}




async function testSecondEscapeButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Start is not visible on main menu!";
    }

    //Click the title as it is a button
    element.click();

    //Check and ensure the game state did NOT change
    if (GAMESTATE != 'PLAYING') {
        throw "Game state changed when the title header was clicked, NOT MENU!";
    }

    //Disposes properly, ready for another element to be grabbed
    element.dispose();

    //Now press escape for pause screen
    await page.keyboard.press('Escape');

    //Check for the the state change
    if (GAMESTATE != 'PAUSE') {
        throw "Game state did not change to pause when paused!";
    }

    //Now send the second escape keypress
    page.keyboard.press('Escape');

    //Now check for game state change
    if (GAMESTATE != 'PLAYING') {
        throw "GAMESTATE is not PLAYING when the escape is pressed for a second time (already in pause menu)!";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testSettingsButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Start is not visible on main menu!";
    }

    //Click the title as it is a button
    element.click();

    //Check and ensure the game state did NOT change
    if (GAMESTATE != 'PLAYING') {
        throw "Game state changed when the title header was clicked, NOT MENU!";
    }

    //Disposes properly, ready for another element to be grabbed
    element.dispose();

    //Now press escape for pause screen
    await page.keyboard.press('Escape');

    //Check for the the state change
    if (GAMESTATE != 'PAUSE') {
        throw "Game state did not change to pause when paused!";
    }

    //Now grab the settings button
    element = await page.waitForSelector('button[name="pauseSettings"]');

    //Check for visiblenes of the button
    if (!element.isVisible()) {
        throw "Pause menu settings button is not visible in the pause menu!";
    }

    //Now click it
    element.click();

    //Now check the state
    if (GAMESTATE != 'PAUSE') {
        throw "Game state is not PAUSE when the settings button is clicked (menu is not implemented yet!)!";
    }

    //Check for visiblenes of the button again
    if (!element.isVisible()) {
        throw "Pause menus settings button is not visible in the pause menu AFTER clicking settings";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}



