var spaces = Array.from({ length: 40 }, () => 0);
var chances = [8, 23, 37];
var chests = [3, 18, 34];
var rails = [5, 25, 35];
var utils = [12, 28];
var deckdef=Array.from(Array(16).keys());
var codeck=deckdef.slice();
var chdeck=deckdef.slice();
var pos = 0;
var jail = 0;
var jailtry = 0;
var dc = 0;
var isd;
function pickChance() {
  if (chdeck.length==0) {
     chdeck=deckdef.slice();
  }
  const picked = chdeck.splice(Math.floor(Math.random() * chdeck.length),1)
  switch (picked) {
    case 1:
      pos = 0;
      spaces[pos]++;
      break;
    case 2:
      pos = 24;
      spaces[pos]++;
      break;
    case 3:
      pos = 11;
      spaces[pos]++;
      break;
    case 4:
      while (!utils.includes(pos)) {
        pos++;
        if (pos === 40) {
          pos = 0;
        }
      }
      spaces[pos]++;
      break;
      break;
    case 5:
      while (!rails.includes(pos)) {
        pos++;
        if (pos === 40) {
          pos = 0;
        }
      }
      spaces[pos]++;
      break;
    case 6:
      if (pos - 3 >= 0) {
        pos -= 3;
      } else {
        pos = pos - 3 + 40;
      }
      spaces[pos]++;
      break;
    case 7:
      pos = 39;
      spaces[pos]++;
      break;
    case 8:
      pos = 5;
      spaces[pos]++;
      break;
    case 9:
      pos = 10;
      jail = 1;
      spaces[pos]++;
      break;
  }
}
function pickChest() {
    if (codeck.length==0) {
      codeck=deckdef.slice();
  }
  const picked = codeck.splice(Math.floor(Math.random() * codeck.length),1)
  switch (picked) {
    case 1: //GO
      pos = 0;
      spaces[pos]++;
      break;
    case 2: //JAIL
      pos = 10;
      jail = 1;
      spaces[pos]++;
      break;
  }
}
function diceroll() {
  let d1 = Math.floor(Math.random() * 6) + 1;
  let d2 = Math.floor(Math.random() * 6) + 1;
  isd = 0;
  if (d1 === d2) {
    dc++;
    isd = 1;
  } else {
    dc = 0;
  }
  return d1 + d2;
}
function move(start) {
  const rolled = diceroll();
  if (dc == 3) {
    dc = 0;
    pos = 10;
    jail = 1;
    spaces[pos]++;
  } else if (jail == 1 && jailtry < 2) {
    dc = 0;
    diceroll();
    if (isd == 1) {
      jail = 0;
      jailtry = 0;
      move(pos);
    }
  } else {
    if (pos + rolled <= 39) {
      pos += rolled;
    } else {
      pos = pos + rolled - 40;
    }
    spaces[pos]++;
    if (chances.includes(pos)) {
      pickChance();
    } else if (chests.includes(pos)) {
      pickChest();
    }
    if (isd == 1 && jail == 0) {
      move(pos);
    }
  }
  if (pos == 30) {
    jail = 0;
    jailtry = 0;
    move(pos);
    spaces[pos]++;
  }
}
for (var i = 0; i < 10000000; i++) {
  move(i);
}
console.log(spaces);
