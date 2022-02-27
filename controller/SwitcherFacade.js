import {AbstractSwitcher} from "./switcher";

/**
 * @class
 */
export class SwitcherFacade {
    /**
     * @constructor
     * @param { {id: string, title: string, Constructor: AbstractSwitcher.prototype.constructor}[] } switcherItems
     */
    constructor(switcherItems) {
        if (!switcherItems?.length) throw new SyntaxError(`В конструктор ${this.constructor} не переданы управляющие элементы!`);
        if (!switcherItems.every(item => item.Constructor && AbstractSwitcher.prototype.isPrototypeOf(item.Constructor.prototype) && item.id && typeof item.id === 'string' && item.title && typeof item.title === 'string')) throw new SyntaxError('Неверный формат управляющих элементов!');
        if (!this.switcherElement) self.#notFoundElement(SwitcherFacade.#ID_SWITCHER);
        if (!this.displayElement) self.#notFoundElement(SwitcherFacade.#ID_DISPLAY);
        if (!this.playElement) self.#notFoundElement(SwitcherFacade.#ID_PLAY);
        if (!this.pauseElement) self.#notFoundElement(SwitcherFacade.#ID_PAUSE);
        if (!this.startResetElement) self.#notFoundElement(SwitcherFacade.#ID_START_RESET);
        if (!this.endResetElement) self.#notFoundElement(SwitcherFacade.#ID_END_RESET);
        if (!this.innerElement) self.#notFoundElement(SwitcherFacade.#ID_INNER);

        this.switcherElement.innerHTML = switcherItems.map(item => SwitcherFacade.#switchTemplate(item)).join('\n');
        this.switcherItems = switcherItems.map(item => ({...item, element: document.querySelector(`#${item.id}`)}))
        this.switcherItems.forEach((item, index) => item.element.addEventListener('click', () => this.#changeSwitcher(index)))
        this.#changeSwitcher(0);

        this.playElement.addEventListener('click', () => this.#start());
        this.pauseElement.addEventListener('click', () => this.#pause());
        this.startResetElement.addEventListener('click', () => this.#startReset());
        this.endResetElement.addEventListener('click', () => this.#endReset());
    }

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_SWITCHER = '#switcher';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_DISPLAY = '#display';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_PLAY = '#play';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_START_RESET = '#start_reset';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_END_RESET = '#end_reset';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_PAUSE = '#pause';

    /**
     * @const
     * @private
     * @type {string}
     */
    static #ID_INNER = '#inner';

    /**
     * @private
     * @type {AbstractSwitcher}
     */
    switcher;

    /**
     * @private
     * @type {HTMLDivElement}
     */
    switcherElement = document.querySelector(SwitcherFacade.#ID_SWITCHER);

    /**
     * @private
     * @type {HTMLDivElement}
     */
    displayElement = document.querySelector(SwitcherFacade.#ID_DISPLAY);

    /**
     * @private
     * @type {HTMLButtonElement}
     */
    playElement = document.querySelector(SwitcherFacade.#ID_PLAY);

    /**
     * @private
     * @type {HTMLButtonElement}
     */
    pauseElement = document.querySelector(SwitcherFacade.#ID_PAUSE);

    /**
     * @private
     * @type {HTMLButtonElement}
     */
    startResetElement = document.querySelector(SwitcherFacade.#ID_START_RESET);

    /**
     * @private
     * @type {HTMLButtonElement}
     */
    endResetElement = document.querySelector(SwitcherFacade.#ID_END_RESET);

    /**
     * @private
     * @type {HTMLDivElement}
     */
    innerElement = document.querySelector(SwitcherFacade.#ID_INNER);

    /**
     * @type {{id: string, title: string, element: HTMLButtonElement, Constructor: AbstractSwitcher.prototype.constructor}[]} switcherItems
     */
    switcherItems;

    /**
     * @function
     * @private
     * @param {string} nameElement
     * @return {never}
     */
    static #notFoundElement(nameElement) {
        throw new SyntaxError(`Элемент ${nameElement} не найден!`);
    }

    /**
     * @function
     * @private
     * @param {{id: string, title: string}}
     * @return {string}
     */
    static #switchTemplate({id, title}) {
        return `<button class="timer__switch" id="${id}">${title}</button>`
    }

    /**
     * @function
     * @private
     * @param {number} switcherIndex
     * @return {void}
     */
    #changeSwitcher(switcherIndex) {
        if (this.switcher) this.switcher.pause();
        this.switcherItems.forEach((item, index) => item.element.disabled = switcherIndex === index);
        this.switcher = new this.switcherItems[switcherIndex].Constructor(this.displayElement, this.playElement, this.pauseElement, this.startResetElement, this.endResetElement);
        this.innerElement.innerHTML = this.switcher.template();
        this.switcher.initial();
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #start() {
        this.switcher.start();
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #pause() {
        this.switcher.pause();
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #startReset() {
        this.switcher.startReset();
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #endReset() {
        this.switcher.endReset();
    }
}