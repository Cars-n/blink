const {By, Builder, Browser, ChromiumWebDriver, Options} = require('selenium-webdriver');
const assert = require("assert");
const { fileURLToPath } = require('url');
const { time } = require('console');

require("chromedriver");

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function testStartButton() {
    let driver;
    
    try {
      
      //Configuring the options of the server
      //options = new ChromeOptions();
      //options.addArguments("--headless"); //Makes chrome launch headless for non-GUI use

      driver = new Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

      //await driver.get();

      console.log("Grabbing the local game instance");
      await driver.get("http://localhost:8000"); //grabs the page
      console.log("Got the local instance!");

      //await sleep(10000);

      // //Now grabs the start button and sends click to play
      // console.log("Grabing the start button by name");
      
      // let startButton = await driver.findElement(By.name("start"));
      // console.log("Got the start button by name");
      
      // console.log("Clicking the start button to start the game");
      // //await startButton.click();
      // console.log("Clicked the start button, game is started");
    
      // console.log("Checking visibility of the start button");
      // //assert(startButton.getAttribute("visible"));


    }  catch (e) {
        console.log(e)
      } finally {
        await driver.quit();
      }
};


testStartButton();