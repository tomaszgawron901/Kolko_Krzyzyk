/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BoardComponent.ts":
/*!*******************************!*\
  !*** ./src/BoardComponent.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = __webpack_require__(/*! ./board */ "./src/board.ts");
const cell_1 = __webpack_require__(/*! ./cell */ "./src/cell.ts");
class BoardComponent extends HTMLDListElement {
    constructor() {
        super();
        this.board = new board_1.default(2);
    }
    setBoard(board) {
        this.board = board;
        this.Refresh();
    }
    Refresh() {
        this.innerHTML = '';
        let table = document.createElement("TABLE");
        if (this.board === undefined) {
            return;
        }
        for (let i = 0; i < this.board.size; i++) {
            let row = table.insertRow(i);
            for (let j = 0; j < this.board.size; j++) {
                let cell = row.insertCell(j);
                let button = document.createElement("BUTTON");
                button.disabled = true;
                button.style.fontSize = '40px';
                switch (this.board.Get(i, j)) {
                    case cell_1.Cell.Circle:
                        button.textContent = 'O';
                        break;
                    case cell_1.Cell.Cross:
                        button.textContent = 'X';
                        break;
                    default:
                        button.textContent = '';
                        button.disabled = false;
                        break;
                }
                button.addEventListener("click", () => { this.dispatchEvent(new CustomEvent('elementClicked', { detail: { x: i, y: j } })); });
                cell.appendChild(button);
            }
        }
        this.appendChild(table);
    }
}
exports.BoardComponent = BoardComponent;


/***/ }),

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = __webpack_require__(/*! ./cell */ "./src/cell.ts");
class Board {
    constructor(d = 3) {
        if (d <= 0 || d % 1 !== 0) {
            throw new RangeError(" Size must be natural number. ");
        }
        this.size = d;
        this._self = Array(this.size);
        for (let i = 0; i < this.size; i++) {
            let row = Array(this.size);
            for (let j = 0; j < this.size; j++) {
                row[j] = cell_1.Cell.Empty;
            }
            this._self[i] = row;
        }
    }
    Get(x, y) {
        return this._self[x][y];
    }
    Set(x, y, sign) {
        this._self[x][y] = sign;
    }
    GetInfo() {
        let rowsSum = new Array(this.size);
        let colsSum = new Array(this.size);
        let diagsSum = [0, 0];
        let nonEmptySum = 0;
        for (let i = 0; i < this.size; i++) {
            diagsSum[0] += this.Get(i, i);
            diagsSum[1] += this.Get(this.size - i - 1, i);
            rowsSum[i] = 0;
            colsSum[i] = 0;
            for (let j = 0; j < this.size; j++) {
                rowsSum[i] += this.Get(i, j);
                colsSum[i] += this.Get(j, i);
                if (this.Get(i, j) != cell_1.Cell.Empty) {
                    nonEmptySum += 1;
                }
            }
        }
        return { rowsSum, colsSum, diagsSum, nonEmptySum };
    }
}
exports.default = Board;


/***/ }),

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cell;
(function (Cell) {
    Cell[Cell["Circle"] = 1] = "Circle";
    Cell[Cell["Empty"] = 0] = "Empty";
    Cell[Cell["Cross"] = -1] = "Cross";
})(Cell = exports.Cell || (exports.Cell = {}));


/***/ }),

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
class Controller {
    constructor(root) {
        this.Game = new game_1.Game();
        this.root = root;
        this.boardComponent = document.createElement('board-component');
        this.root.appendChild(this.boardComponent);
        this.boardComponent.addEventListener('elementClicked', (event) => {
            let custom = event;
            this.Game.SelectCell(custom.detail.x, custom.detail.y);
            this.boardComponent.Refresh();
        });
    }
}
exports.Controller = Controller;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const board_1 = __webpack_require__(/*! ./board */ "./src/board.ts");
const cell_1 = __webpack_require__(/*! ./cell */ "./src/cell.ts");
var GameState;
(function (GameState) {
    GameState[GameState["onGoing"] = 0] = "onGoing";
    GameState[GameState["circleWins"] = 1] = "circleWins";
    GameState[GameState["crossWins"] = 2] = "crossWins";
    GameState[GameState["draw"] = 3] = "draw";
})(GameState = exports.GameState || (exports.GameState = {}));
var Players;
(function (Players) {
    Players[Players["cirlce"] = 0] = "cirlce";
    Players[Players["cross"] = 1] = "cross";
})(Players = exports.Players || (exports.Players = {}));
class Game {
    constructor() {
        this.board = new board_1.default(7);
        this.state = GameState.onGoing;
        this.turn = Players.cirlce;
    }
    calculateState() {
        let info = this.board.GetInfo();
        let boardVectors = info.rowsSum.concat(info.colsSum.concat(info.diagsSum));
        for (let i = 0; i < boardVectors.length; i++) {
            if (boardVectors[i] === this.board.size) {
                this.state = GameState.circleWins;
                return;
            }
            if (boardVectors[i] === -this.board.size) {
                this.state = GameState.crossWins;
                return;
            }
        }
        if (info.nonEmptySum === Math.pow(this.board.size, 2)) {
            this.state = GameState.draw;
            return;
        }
        this.state = GameState.onGoing;
    }
    swapTurn() {
        if (this.turn == Players.cirlce) {
            this.turn = Players.cross;
            return;
        }
        this.turn = Players.cirlce;
    }
    SelectCell(x, y) {
        if (this.state !== GameState.onGoing) {
            return;
        }
        if (this.board.Get(x, y) !== cell_1.Cell.Empty) {
            return;
        }
        switch (this.turn) {
            case Players.cirlce:
                this.board.Set(x, y, cell_1.Cell.Circle);
                break;
            case Players.cross:
                this.board.Set(x, y, cell_1.Cell.Cross);
                break;
        }
        this.calculateState();
        this.swapTurn();
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __webpack_require__(/*! ./controller */ "./src/controller.ts");
const BoardComponent_1 = __webpack_require__(/*! ./BoardComponent */ "./src/BoardComponent.ts");
customElements.define('board-component', BoardComponent_1.BoardComponent, { extends: 'DIV' });
let con = new controller_1.Controller(document.body);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JvYXJkQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9ib2FyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2VsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHFFQUE0QjtBQUM1QixrRUFBOEI7QUFFOUIsTUFBYSxjQUFlLFNBQVEsZ0JBQWdCO0lBRWhEO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFF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TTtnQkFDZixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsTUFBTTtZQUNWLEtBQUssT0FBTyxDQUFDLEtBQUs7Z0JBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07U0FDYjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBMURELG9CQTBEQzs7Ozs7Ozs7Ozs7Ozs7O0FDckVELG9GQUF3QztBQUN4QyxnR0FBZ0Q7QUFFaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSwrQkFBYyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDM0UsSUFBSSxHQUFHLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vYm9hcmQnO1xyXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi9jZWxsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCb2FyZENvbXBvbmVudCBleHRlbmRzIEhUTUxETGlzdEVsZW1lbnQge1xyXG4gICAgYm9hcmQ6IEJvYXJkIHwgdW5kZWZpbmVkO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEJvYXJkKGJvYXJkOiBCb2FyZCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcclxuICAgICAgICB0aGlzLlJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaCgpIHtcclxuICAgICAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJUQUJMRVwiKSBhcyBIVE1MVGFibGVFbGVtZW50O1xyXG4gICAgICAgIGlmICggdGhpcy5ib2FyZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvYXJkLnNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGFibGUuaW5zZXJ0Um93KGkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYm9hcmQuc2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKGopO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkJVVFRPTlwiKTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUuZm9udFNpemUgPSAnNDBweCc7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuYm9hcmQuR2V0KGksIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDZWxsLkNpcmNsZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ08nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENlbGwuQ3Jvc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoJ2VsZW1lbnRDbGlja2VkJywgIHtkZXRhaWw6IHt4OiBpLCB5OiBqfSB9KSApIH0pXHJcbiAgICAgICAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0YWJsZSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0NlbGx9IGZyb20gJy4vY2VsbCc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmR7XHJcbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc2VsZjogQ2VsbFtdW107XHJcbiAgICBjb25zdHJ1Y3RvciggZDogbnVtYmVyID0gMykge1xyXG4gICAgICAgIGlmIChkIDw9IDAgfHwgZCUxICE9PSAwICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIiBTaXplIG11c3QgYmUgbmF0dXJhbCBudW1iZXIuIFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaXplID0gZDtcclxuICAgICAgICB0aGlzLl9zZWxmID0gQXJyYXk8QXJyYXk8Q2VsbD4+KHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpPCB0aGlzLnNpemU7IGkrKyApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gQXJyYXk8Q2VsbD4odGhpcy5zaXplKTtcclxuICAgICAgICAgICAgZm9yICggbGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKysgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3dbal0gPSBDZWxsLkVtcHR5XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc2VsZltpXSA9IHJvd1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0KCB4OiBudW1iZXIsIHk6IG51bWJlciApOiBDZWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZlt4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCBzaWduOiBDZWxsKXtcclxuICAgICAgICB0aGlzLl9zZWxmW3hdW3ldID0gc2lnbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0SW5mbygpIHtcclxuICAgICAgICBsZXQgcm93c1N1bSA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgbGV0IGNvbHNTdW0gPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLnNpemUpO1xyXG4gICAgICAgIGxldCBkaWFnc1N1bSA9IFswLCAwXTtcclxuICAgICAgICBsZXQgbm9uRW1wdHlTdW0gPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRpYWdzU3VtWzBdICs9IHRoaXMuR2V0KGksIGkpO1xyXG4gICAgICAgICAgICBkaWFnc1N1bVsxXSArPSB0aGlzLkdldCh0aGlzLnNpemUgLWkgLTEsIGkpO1xyXG5cclxuICAgICAgICAgICAgcm93c1N1bVtpXSA9IDA7XHJcbiAgICAgICAgICAgIGNvbHNTdW1baV0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzU3VtW2ldICs9IHRoaXMuR2V0KGksIGopO1xyXG4gICAgICAgICAgICAgICAgY29sc1N1bVtpXSArPSB0aGlzLkdldChqLCBpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HZXQoaSwgaikgIT0gQ2VsbC5FbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vbkVtcHR5U3VtICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3Jvd3NTdW0sIGNvbHNTdW0sIGRpYWdzU3VtLCBub25FbXB0eVN1bX07XHJcblxyXG4gICAgfVxyXG5cclxufSIsImV4cG9ydCBlbnVtIENlbGwge1xyXG4gICAgQ2lyY2xlID0gMSxcclxuICAgIEVtcHR5ID0gMCxcclxuICAgIENyb3NzID0gLTFcclxufSIsImltcG9ydCB7R2FtZX0gZnJvbSAnLi9nYW1lJztcclxuaW1wb3J0IHtCb2FyZENvbXBvbmVudH0gZnJvbSAnLi9Cb2FyZENvbXBvbmVudCc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgR2FtZTogR2FtZTtcclxuICAgIHJvb3Q6IEhUTUxFbGVtZW50O1xyXG4gICAgYm9hcmRDb21wb25lbnQ6IEJvYXJkQ29tcG9uZW50O1xyXG4gICAgY29uc3RydWN0b3Iocm9vdDogSFRNTEVsZW1lbnQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HYW1lID0gbmV3IEdhbWUoKTtcclxuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb21wb25lbnQgPSA8Qm9hcmRDb21wb25lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9hcmQtY29tcG9uZW50Jyk7XHJcbiAgICAgICAgLy90aGlzLmJvYXJkQ29tcG9uZW50LnNldEJvYXJkKHRoaXMuR2FtZS5ib2FyZCk7XHJcbiAgICAgICAgdGhpcy5yb290LmFwcGVuZENoaWxkKHRoaXMuYm9hcmRDb21wb25lbnQpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcignZWxlbWVudENsaWNrZWQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGN1c3RvbSA9IGV2ZW50IGFzIEN1c3RvbUV2ZW50PHt4OiBudW1iZXI7IHk6IG51bWJlcjt9PjtcclxuICAgICAgICAgICAgdGhpcy5HYW1lLlNlbGVjdENlbGwoY3VzdG9tLmRldGFpbC54LCBjdXN0b20uZGV0YWlsLnkpO1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkQ29tcG9uZW50LlJlZnJlc2goKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJvYXJkIGZyb20gJy4vYm9hcmQnO1xyXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi9jZWxsJztcclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZSB7XHJcbiAgICBvbkdvaW5nLCBjaXJjbGVXaW5zLCBjcm9zc1dpbnMsIGRyYXdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUGxheWVycyB7XHJcbiAgICBjaXJsY2UsIGNyb3NzXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgIGJvYXJkOiBCb2FyZDtcclxuICAgIHN0YXRlOiBHYW1lU3RhdGU7XHJcbiAgICB0dXJuOiBQbGF5ZXJzO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmJvYXJkID0gbmV3IEJvYXJkKDcpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBHYW1lU3RhdGUub25Hb2luZztcclxuICAgICAgICB0aGlzLnR1cm4gPSBQbGF5ZXJzLmNpcmxjZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVN0YXRlKCkge1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5ib2FyZC5HZXRJbmZvKCk7XHJcbiAgICAgICAgbGV0IGJvYXJkVmVjdG9ycyA9IGluZm8ucm93c1N1bS5jb25jYXQoaW5mby5jb2xzU3VtLmNvbmNhdChpbmZvLmRpYWdzU3VtKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZFZlY3RvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJvYXJkVmVjdG9yc1tpXSA9PT0gdGhpcy5ib2FyZC5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gR2FtZVN0YXRlLmNpcmNsZVdpbnM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvYXJkVmVjdG9yc1tpXSA9PT0gLXRoaXMuYm9hcmQuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IEdhbWVTdGF0ZS5jcm9zc1dpbnM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZm8ubm9uRW1wdHlTdW0gPT09IHRoaXMuYm9hcmQuc2l6ZSoqMikge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gR2FtZVN0YXRlLmRyYXc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IEdhbWVTdGF0ZS5vbkdvaW5nO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHN3YXBUdXJuKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT0gUGxheWVycy5jaXJsY2UpIHtcclxuICAgICAgICAgICAgdGhpcy50dXJuID0gUGxheWVycy5jcm9zcztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnR1cm4gPSBQbGF5ZXJzLmNpcmxjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2VsZWN0Q2VsbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZSAhPT0gR2FtZVN0YXRlLm9uR29pbmcgKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLmJvYXJkLkdldCh4LCB5KSAhPT0gQ2VsbC5FbXB0eSApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnR1cm4pIHtcclxuICAgICAgICAgICAgY2FzZSBQbGF5ZXJzLmNpcmxjZTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQuU2V0KHgsIHksIENlbGwuQ2lyY2xlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBsYXllcnMuY3Jvc3M6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLlNldCh4LCB5LCBDZWxsLkNyb3NzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5zd2FwVHVybigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb250cm9sbGVyfSBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQge0JvYXJkQ29tcG9uZW50fSBmcm9tICcuL0JvYXJkQ29tcG9uZW50JztcclxuXHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYm9hcmQtY29tcG9uZW50JywgQm9hcmRDb21wb25lbnQsIHtleHRlbmRzOiAnRElWJ30pO1xyXG5sZXQgY29uID0gbmV3IENvbnRyb2xsZXIoZG9jdW1lbnQuYm9keSk7Il0sInNvdXJjZVJvb3QiOiIifQ==