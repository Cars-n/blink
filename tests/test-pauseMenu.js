const puppeteer = require('puppeteer');
const core=require('@actions/core');
const { error } = require('console');
const { start } = require('repl');


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
    element = await page.waitForSelector('button[name="resume"]');

    //Check for visibility
    if (!element.isVisible()) {
        throw "Resume button is not visible on pause screen!";
    }

    element.click();


    //Now check for game state change
    if (GAMESTATE != 'PLAYING') {
        throw "GAMESTATE is not PLAYING when resume is clicked in pause menu!";
    }

    //Now check for button visiblity
    if (element.isVisible()) {
        throw "Resume button is visible when playing game!";
    }

    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testStartButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="start"]');

    //Now check for visiblenes
    if(!startButton.isVisible()) {
        throw "Start button is not visible on main menu!";
    }

    //Now click
    startButton.click();

    //Check the game state
    if (GAMESTATE != 'PLAYING') {
        throw "Game state is not PLAYING and stuck on menu when start is clicked!";
    }


    //Check for visibility
    if (startButton.isVisible()) {
        throw "Start button is visible during game play!";
    }



    //dispose of the element
    startButton.dispose();

    await browser.close();
    
}

async function testExitButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="exit"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Exit button is not visible on main menu!";
    }

    //Now click
    element.click();

    //Check the game state
    if (GAMESTATE != 'MENU') {
        throw "Game state is not in the main menu!";
    }


    //Check for visibility
    if (!element.isVisible()) {
        throw "Exit button is NOT visible on menu!";
    }



    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testTutorialButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="tutorial"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Tutorial button is not visible on main menu!";
    }

    //Now click
    element.click();

    //Check the game state
    if (GAMESTATE != 'MENU') {
        throw "Game state is not in the main menu!";
    }


    //Check for visibility
    if (!element.isVisible()) {
        throw "Tutorial button is NOT visible on menu!";
    }



    //dispose of the element
    element.dispose();

    await browser.close();
    
}


async function testControlsButton() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
   

    
    await page.goto('http://127.0.0.1:8000/index.html');

    //Now check for the start button
    const element = await page.waitForSelector('button[name="controls"]');

    //Now check for visiblenes
    if(!element.isVisible()) {
        throw "Controls button is not visible on main menu!";
    }

    //Now click
    element.click();

    //Check the game state
    if (GAMESTATE != 'MENU') {
        throw "Game state is not in the main menu!";
    }


    //Check for visibility
    if (!element.isVisible()) {
        throw "Controls button is NOT visible on menu!";
    }



    //dispose of the element
    element.dispose();

    await browser.close();
    
}



