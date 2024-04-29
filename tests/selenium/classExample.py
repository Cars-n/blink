from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

def test_wikipedia_python_results():
    print("testing wikipedia results to make sure BDFL is mentioned")
    browser = webdriver.Chrome()
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
    browser = webdriver.Chrome()
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