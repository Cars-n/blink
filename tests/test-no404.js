const puppeteer = require('puppeteer');
const core=require('@actions/core')
async function monitorNetwork() {
    const browser = await puppeteer.launch({headless:true,args: ['--no-sandbox']});
    const page = await browser.newPage();
    var count404=0;
    // Listen for all network requests

    page.on('response', async response => {
        if(response.status()==404){
            console.error("Request failed for resource at: ",response.url());
            count404+=1;
        }
    });
    await page.goto('http://127.0.0.1:8000/index.html');
    await browser.close();
    return count404;
}
monitorNetwork().then((errorCount)=>{
    if(errorCount>0){
        core.setFailed("404 Error(s) Detected");
    }
});

