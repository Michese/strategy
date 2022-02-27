/**
 * @abstract
 * @class
 */
export class AbstractFormat {
    /**
     * @constructor
     */
    constructor() {
        if (this.constructor === AbstractFormat)
            throw new Error('Невозможно создать экземпляр абстрактного класса!');
    }

    /**
     * @function
     * @public
     * @abstract
     * @param {Date} date
     * @return {string}
     */
    getFormatTime(date) {
        throw new SyntaxError(`Необходимо переопределить метод getFormatTime в классе ${this.constructor}!`);
    }
}