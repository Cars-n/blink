from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from behave import *
import time
import chromedriver_autoinstaller

chromedriver_autoinstaller.install()

def open_browser(link='http://127.0.0.1:8000/index.html'):
    time.sleep(1)
    chrome_options = webdriver.ChromeOptions()    
    # Add your options as needed    
    options = [
    # Define window size here
        "--ignore-certificate-errors",
        "--headless",
        "--no-sandbox"
    ]

    for option in options:
        chrome_options.add_argument(option)

    browser = webdriver.Chrome(options = chrome_options)
    browser.get(link)
    time.sleep(3)#Sleep to load page
    print("Page loaded...")
    
    # res=browser.find_element(By.NAME,"controls")
    return browser

@given(u'the site is loaded')
def step_impl(context):
    context.browser=open_browser()

@when(u'we click "{button_name}"')
def step_impl(context, button_name):
    context.browser.find_element(By.NAME,button_name).click()
    time.sleep(2)

@then(u'the game state is "{goal_state}"')
def step_impl(context, goal_state):
    assert(context.browser.execute_script(f"return GAMESTATE;")==goal_state)

@given(u'the game is started')
def step_impl(context):
    context.browser=open_browser()
    context.browser.find_element(By.NAME,"start").click()
    time.sleep(1)
    context.browser.find_element(By.NAME,"start").click()


