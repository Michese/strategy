/**
 * @abstract
 * @class
 */
export class AbstractSwitcher {
    /**
     * @constructor
     */
    constructor(displayElement, playElement, pauseElement, startResetElement, endResetElement) {
        if (this.constructor === AbstractSwitcher) {
            throw new Error('Невозможно создать экземпляр абстрактного класса!');
        }

        this.displayElement = displayElement;
        this.playElement = playElement;
        this.pauseElement = pauseElement;
        this.startResetElement = startResetElement;
        this.endResetElement = endResetElement;

        this.startResetElement.disabled = true;
        this.endResetElement.disabled = true;
        this.pauseElement.disabled = true;
        this.playElement.disabled = true;
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {string}
     */
    template() {
        this.#callingAbstractMethod('template');
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {void}
     */
    start() {
        this.#callingAbstractMethod('start');
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {void}
     */
    pause() {
        this.#callingAbstractMethod('pause');
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {void}
     */
    startReset() {
        this.#callingAbstractMethod('startReset');
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {void}
     */
    endReset() {
        this.#callingAbstractMethod('endReset');
    }

    /**
     * @function
     * @public
     * @abstract
     * @return {void}
     */
    initial() {
        this.#callingAbstractMethod('endReset');
    }

    /**
     * @const
     * @static
     * @type {number}
     */
    static MAX_HOURS = 99;

    /**
     * @const
     * @static
     * @type {number}
     */
    static SECONDS_IN_MINUTE = 60;

    /**
     * @const
     * @static
     * @type {number}
     */
    static SECONDS_IN_HOUR = 3600;

    /**
     * @protected
     * @type {Element}
     */
    displayElement;

    /**
     * @protected
     * @type {Element}
     */
    playElement;

    /**
     * @protected
     * @type {Element}
     */
    pauseElement;

    /**
     * @protected
     * @type {Element}
     */
    startResetElement;

    /**
     * @protected
     * @type {Element}
     */
    endResetElement;

    /**
     * @protected
     * @type {number|null}
     */
    interval = null;

    /**
     * @function
     * @private
     * @param {string} nameMethod
     * @return {never}
     */
    #callingAbstractMethod(nameMethod) {
        throw new SyntaxError(`Необходимо переопределить метод ${nameMethod} в классе ${this.constructor}!`);
    }
}