Feature: menu works

Scenario Outline: Using menu
  Given the site is loaded
    When we click "<button_id>"
    Then the game state is "<goal_state>"

 Examples: Main Menu
   | button_id   | goal_state   |
   | start       | PLAYING      |
