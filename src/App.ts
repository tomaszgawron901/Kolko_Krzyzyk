import {Controller} from './controller.js';

let con = new Controller(document.body);
con.render();
con.Game.SelectCell(0, 0);
con.Game.SelectCell(0, 1);
con.Game.SelectCell(2, 0);
con.Game.SelectCell(1, 0);
con.Game.state;