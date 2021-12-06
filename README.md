# React Mini Games

## Overview

This project is a small single-page application built with ReactJS. The app consists of a dashboard and three mini-games along with a unique route for each screen. 

Preview  
![Preview](preview/preview.mov)

### Dashboard

- `Game won` field records the number of games that the user has won, and is recorded in the local storage. The initial score is 5. 
- `Reset` button can set the value of 'game won' to an initial value of 5.

### Blanko

A simple crossword puzzle

![Preview](preview/blanki.mov)

### Slido

A 3x3 Shrek sliding puzzle game

![Preview](preview/slido.mov)

### Tetro

A 12 x 10 Tetris game

- Three kinds of blocks - `1 x 1`, `2 x 2` and `1 x 2`, will show up randomly
- The block will get down at the speed of 500ms/1 block
- Use the `left` and `right` arrows to move the block
- You won if you fill any five rows
- You failed if the height of any columns exceeds 10

![Preview](preview/tetro.mov)

## How to run

- Run `yarn install` to install all relevant dependencies to start.
- Run `yarn start` to start the ReactJS app.
- Visit `http://localhost:3000/` [[click here]](http://localhost:3000/)