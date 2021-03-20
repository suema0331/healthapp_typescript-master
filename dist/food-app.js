"use strict";
class Score {
    constructor() { }
    static getInstance() {
        if (!Score.instance) {
            Score.instance = new Score();
        }
        return Score.instance;
    }
    get totalScore() {
        // 唯一のインスタンスを取得
        const foods = Foods.getInstance();
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        document.querySelector('.score__number').textContent = String(this.totalScore);
    }
}
// element特有の処理を書くクラス
class Food {
    constructor(element) {
        this.element = element;
        // クリックイベントのthisはクラス内のthis
        element.addEventListener('click', this.clickEventHandler.bind(this));
    }
    // clickイベントを増殖
    clickEventHandler() {
        // callback関数の中のthisはelementを指すので、bind必要！
        this.element.classList.toggle('food--active'); // opacity1
        const score = Score.getInstance();
        score.render();
    }
}
class Foods {
    constructor() {
        this.elements = document.querySelectorAll('.food');
        this._activeElements = [];
        this._activeElementsScore = [];
        this.elements.forEach(element => {
            new Food(element); // コンストラクタに渡す
        });
    }
    get activeElements() {
        this._activeElements = [];
        this.elements.forEach(element => {
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element);
            }
        });
        return this._activeElements;
    }
    get activeElementsScore() {
        this._activeElementsScore = [];
        this.activeElements.forEach(element => {
            const foodScore = element.querySelector('.food__score');
            if (foodScore) {
                // nullは0
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        });
        return this._activeElementsScore;
    }
    static getInstance() {
        if (!Foods.instance) {
            Foods.instance = new Foods();
        }
        return Foods.instance;
    }
}
const foods = Foods.getInstance();
