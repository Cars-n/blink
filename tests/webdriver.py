from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
# from webdriver_manager.chrome import ChromeDriverManager
import time
import chromedriver_autoinstaller

chromedriver_autoinstaller.install()  # Check if the current version of chromedriver exists
                                      # and if it doesn't exist, download it automatically,
                                      # then add chromedriver to path

chrome_options = webdriver.ChromeOptions()    
# Add your options as needed    
options = [
  # Define window size here
    "--ignore-certificate-errors",
    "--headless",
    #"--disable-gpu",
    #"--window-size=1920,1200",
    #"--ignore-certificate-errors",
    #"--disable-extensions",
    "--no-sandbox"
    #"--disable-dev-shm-usage",
    #'--remote-debugging-port=9222'
]

for option in options:
    chrome_options.add_argument(option)



def test_wikipedia_python_results():
    print("testing wikipedia results to make sure BDFL is mentioned")
    browser = webdriver.Chrome(options = chrome_options)
    browser.get("http://wikipedia.org")
    query = "Python (programming language)"
    search_input = browser.find_element(By.ID,"searchInput")
    search_input.clear()
    search_input.send_keys(query)  
    search_input.send_keys(Keys.RETURN)  
    assert "Guido" in browser.page_source
    time.sleep(10)
    browser.close()

def test_wikipedia_CPP_results():
    print("testing wikipedia results to make sure Bjarne is mentioned")
    browser = webdriver.Chrome(options = chrome_options)
    browser.get("http://wikipedia.org")
    query = "C++"
    search_input = browser.find_element(By.ID,"searchInput")
    search_input.clear()
    search_input.send_keys(query)  
    search_input.send_keys(Keys.RETURN)  
    assert "Bjarne Stroustrup" in browser.page_source
    time.sleep(3)
    browser.close()


if __name__ == "__main__":
    test_wikipedia_python_results()
    test_wikipedia_CPP_results()
    print("done.")
