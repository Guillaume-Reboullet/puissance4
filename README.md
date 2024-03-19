# puissance4 

#### Jeu puissance 4 version web / Puissance 4 game web version

Start server: php -S localhost:```<Port>```

Use the plugin: in main.js, set up the plugin like so: 


##

### main.js
```javascript
let gameBoard = new puissance4({
    rows: numbers of row,
    columns: numbers of column,
    playerId1: name of the player 1,
    playerId2: name of the player 2,
    playerColor1: skin color of the player 1,
    playerColor2: skin color of the player 2,
});
```