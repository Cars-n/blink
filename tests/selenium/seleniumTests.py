from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import Keys, ActionChains
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
    # "--disable-gpu",
    # "--window-size=1920,1200",
    # "--ignore-certificate-errors",
    # "--disable-extensions",
    "--no-sandbox"
    # "--disable-dev-shm-usage",
    # '--remote-debugging-port=9222'
]

for option in options:
    chrome_options.add_argument(option)

def open_browser(link='http://127.0.0.1:8000/index.html'):
    browser = webdriver.Chrome(options = chrome_options)
    browser.get(link)
    return browser

def open_browser_and_start_game(link='http://127.0.0.1:8000/index.html'):
    browser=open_browser(link)
    time.sleep(2)
    browser.find_element(By.NAME,'start').click() # Go to blink selection
    time.sleep(1.5)
    browser.find_element(By.NAME,'exit').click() # go to game start
    return browser

def test_execute():
    browser = open_browser_and_start_game()
    time.sleep(4)
    print(browser.execute_script('return testFunc();'))

def test_rooms():
    browser = open_browser_and_start_game()
    time.sleep(2)
    print("Testing player can move rooms...")
    start_room=browser.execute_script('return player.room;')
    print("Starting in room: ",start_room)
    #Move player to the room to the right, hopefully no obstacles :)
    ActionChains(browser)\
        .key_down('d')\
        .perform()
    time.sleep(2.5)
    ActionChains(browser)\
        .key_down('w')\
        .perform()
    time.sleep(1)
    ActionChains(browser)\
        .key_up('w')\
        .key_up('d')\
        .perform()
    time.sleep(3)
    new_room=browser.execute_script('return player.room;')
    assert(new_room['x']!=start_room)
    print("Rooms changed!")

def test_movement():
    browser = open_browser_and_start_game()
    time.sleep(4)

    print("Testing player can move upwards...")
    y_pos = browser.execute_script('return player.y;')
    print("Player Y position: ", y_pos)
    ActionChains(browser)\
        .key_down('w')\
        .perform()
    time.sleep(.1)
    ActionChains(browser)\
        .key_up('w')\
        .perform()
    time.sleep(.1)
    new_y_pos = browser.execute_script('return player.y;')
    print("Player Y position after moving upwards: ", new_y_pos)
    assert new_y_pos < y_pos, "Failed to move upwards"
    print("Upward movement passed")

    print("Testing player can move downwards...")
    y_pos = browser.execute_script('return player.y;')
    print("Player Y position: ", y_pos)
    ActionChains(browser)\
        .key_down('s')\
        .perform()
    time.sleep(.1)
    ActionChains(browser)\
        .key_up('s')\
        .perform()
    time.sleep(.1)
    new_y_pos = browser.execute_script('return player.y;')
    print("Player Y position after moving downwards: ", new_y_pos)
    assert new_y_pos > y_pos, "Failed to move downwards"
    print("Downward movement passed")

    print("Testing player can move to the left...")
    x_pos = browser.execute_script('return player.x;')
    print("Player X position: ", x_pos)
    ActionChains(browser)\
        .key_down('a')\
        .perform()
    time.sleep(.1)
    ActionChains(browser)\
        .key_up('a')\
        .perform()
    time.sleep(.1)
    new_x_pos = browser.execute_script('return player.x;')
    print("Player X position after moving to the left: ", new_x_pos)
    assert new_x_pos < x_pos, "Failed to move to the left"
    print("Left movement passed")

    print("Testing player can move to the right...")
    x_pos = browser.execute_script('return player.x;')
    print("Player X position: ", x_pos)
    ActionChains(browser)\
        .key_down('d')\
        .perform()
    time.sleep(.1)
    ActionChains(browser)\
        .key_up('d')\
        .perform()
    time.sleep(.1)
    new_x_pos = browser.execute_script('return player.x;')
    print("Player X position after moving to the right: ", new_x_pos)
    assert new_x_pos > x_pos, "Failed to move to the right"
    print("Right movement passed")

def test_death():
    browser = open_browser_and_start_game()
    time.sleep(4)

    print("Testing player death")
    player_health = browser.execute_script('return player.health')
    assert player_health > 0, "Player is dead on start"
    print("Player has ",player_health," health")
    browser.execute_script('player.health -= 200')
    time.sleep(4)
    alert = browser.switch_to.alert
    alert_text = alert.text
    assert "died" in alert_text, "Expected alert didn't appear"
    alert.dismiss()
    gamestate = browser.execute_script('return GAMESTATE')
    print(gamestate)
    assert gamestate != "PLAYING", "Game state did not change"
    print("Player death passed")


def test_inventory():
    browser = open_browser_and_start_game()
    time.sleep(4)

    print("Testing player inventory")
    print("Checking if player is empty on start")
    empty_inventory = browser.execute_script('\
        for (let j = 0; j < InventoryController.INVENTORY_HEIGHT; j++) {\
            for (let i = 0; i < InventoryController.INVENTORY_WIDTH; i++) {\
                if (inventory.inventory[j][i] != "") return false;\
            }\
        }\
        return true;\
    ')
    assert empty_inventory == True, "Player's inventory is not empty on start"
    print("Creating flashlight item on player")
    browser.execute_script('\
        flashlight = new Item(player.x,player.y, "FlashLight", 2,1,8,20,flashlightImage);\
    ')
    time.sleep(.1)
    has_item = browser.execute_script('return inventory.hasItem(flashlight)')
    assert has_item == True, "Player did not pick up flashlight"
    time.sleep(5)

    print("Creating gun item on player")
    browser.execute_script('\
        gun = new Item(player.x,player.y, "Gun", 2,1,33,6,gunImage);\
    ')
    time.sleep(.1)
    has_item = browser.execute_script('return inventory.hasItem(gun)')
    assert has_item == True, "Player did not pick up gun"
    time.sleep(5)

    print("Creating bullet item on player")
    browser.execute_script('\
        bulletItem = new Item(player.x,player.y, "Bullet", 1,1,4,3,bulletImage);\
    ')
    time.sleep(.1)
    has_item = browser.execute_script('return inventory.hasItem(bulletItem)')
    assert has_item == True, "Player did not pick up bullet"

    print("Creating key item on player")
    browser.execute_script('\
        key = new Item(player.x,player.y, "Key", 1,1,10,5,keyImage);\
    ')
    time.sleep(.1)
    has_item = browser.execute_script('return inventory.hasItem(key)')
    assert has_item == True, "Player did not pick up key"

    print("Checking if player's inventory is full")
    has_space = browser.execute_script('return inventory.hasSpace(1,1)')
    assert has_space["orientation"] == "none", "Player has storage space left"

    print("Checking if items are not visible")
    assert browser.execute_script('return flashlight.itemSprite.visible') == False, "Flashlight sprite is still visible"
    assert browser.execute_script('return gun.itemSprite.visible') == False, "Gun sprite is still visible"
    assert browser.execute_script('return bulletItem.itemSprite.visible') == False, "Bullet sprite is still visible"
    assert browser.execute_script('return key.itemSprite.visible') == False, "Key sprite is still visible"

    print("Spawning item on player while inventory is full")
    browser.execute_script('\
        key = new Item(player.x,player.y, "Key", 1,1,10,5,keyImage);\
    ')
    time.sleep(.1)
    has_item = browser.execute_script('return inventory.hasItem(key)')
    assert has_item == False, "Player picked up key"
    assert browser.execute_script('return key.itemSprite.visible') == True, "Key sprite is not visible"
    print("Inventory test passed")
    

if __name__ == "__main__":
    test_movement()
    test_rooms()
    test_death()
    test_inventory()
    print("done.")
