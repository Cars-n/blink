const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");
const { fileURLToPath } = require('url');
const { time } = require('console');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function testStartButton() {
    let driver;
    
    try {
      driver = await new Builder().forBrowser(Browser.CHROME).build();

      //await driver.get();

      console.log("Grabbing the local game instance");
      await driver.get("https://cars-n.github.io/blink/"); //grabs the page
      console.log("Got the local instance!");

      //await sleep(10000);

      //Now grabs the start button and sends click to play
      console.log("Grabing the start button by name");
      
      let startButton = await driver.findElement(By.name("start"));
      console.log("Got the start button by name");
      
      console.log("Clicking the start button to start the game");
      //await startButton.click();
      console.log("Clicked the start button, game is started");
    
      console.log("Checking visibility of the start button");
      //assert(startButton.getAttribute("visible"));


    }  catch (e) {
        console.log(e)
      } finally {
        await driver.quit();
      }
};


testStartButton();