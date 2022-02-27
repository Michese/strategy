import {AbstractSwitcher} from "./base";
import {Hours12Format, Hours24Format} from "./format";

/**
 * @class
 */
export class ClockSwitcher extends AbstractSwitcher {
    /**
     * @constructor
     */
    constructor(displayElement, playElement, pauseElement, startResetElement, endResetElement) {
        super(displayElement, playElement, pauseElement, startResetElement, endResetElement);

        if (!this.#formatItems.length) throw new SyntaxError('Массив форматов выводов не инициализирован!')
        this.#format = new this.#formatItems[0].Constructor();
    }

    /**
     * @function
     * @public
     * @override
     * @return {string}
     */
    template() {
        return `                    <legend>Format</legend>
                    <select class="timer__select form-select" aria-label="Default select example" id="${ClockSwitcher.#ID_SELECT}">
                        ${this.#formatItems.map((item, index) => ClockSwitcher.#optionTemplate(item.value, item.title, index === 0)).join('\n')}
                    </select>`;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    endReset() {
        throw new SyntaxError('У метода endReset нет реализации!');
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    pause() {
        this.pauseElement.disabled = true;
        clearInterval(this.interval);
        this.playElement.disabled = false;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    start() {
        this.playElement.disabled = true;
        this.interval = setInterval(() => this.#renderClock(), 1000);
        this.pauseElement.disabled = false;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    startReset() {
        throw new SyntaxError('У метода startReset нет реализации!');
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    initial() {
        this.displayElement.innerHTML = this.#format.getFormatTime(new Date());
        this.#selectElement = document.querySelector(`#${ClockSwitcher.#ID_SELECT}`);

        if (!this.#selectElement) throw new SyntaxError('Выпадающий список не найден!');

        this.#selectElement.addEventListener('change', (event) => {
            this.#changeFormat(event.target.value);
        });

        this.playElement.disabled = false;
    }

    /**
     * @const
     * @static
     * @private
     * @type {string}
     */
    static #ID_SELECT = 'clock_select';

    /**
     * @private
     * @type {HTMLSelectElement}
     */
    #selectElement;

    /**
     * @private
     * @type {{Constructor: AbstractFormat.prototype.constructor, title: string, value: string}[]}
     */
    #formatItems = [
        {value: '12hours', title: '12 hours', Constructor: Hours12Format},
        {value: '24hours', title: '24 hours', Constructor: Hours24Format},
    ];

    /**
     * @private
     * @type {AbstractFormat}
     */
    #format;

    /**
     * @function
     * @private
     * @param {string} value
     * @param {string} title
     * @param {boolean} isSelected
     * @return {string}
     */
    static #optionTemplate(value, title, isSelected = false) {
        return `<option value="${value}" ${isSelected ? 'selected' : ''}>${title}</option>`
    }

    /**
     * @function
     * @private
     * @param {string} value
     * @return {void}
     */
    #changeFormat(value) {
        const formatItem = this.#formatItems.find(item => item.value === value);
        if (!formatItem) throw new SyntaxError(`Не найден элемент массива со значением ${value}!`);
        this.#format = new formatItem.Constructor();
        this.#renderClock();
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #renderClock() {
        this.displayElement.innerHTML = this.#format.getFormatTime(new Date());
    }
}