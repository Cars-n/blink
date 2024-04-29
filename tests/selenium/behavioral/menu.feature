Feature: menu works

Scenario Outline: Using menu
  Given the site is loaded
    When we click "<button_name>"
    Then the game state is "<goal_state>"

 Examples: Main Menu
   | button_name   | goal_state   |
   | start         | PLAYING      |
