import {AbstractSwitcher, CountSwitcher} from "./base";

/**
 * @class
 */
export class CountUpSwitcher extends AbstractSwitcher {
    /**
     * @constructor
     */
    constructor(displayElement, playElement, pauseElement, startResetElement, endResetElement) {
        super(displayElement, playElement, pauseElement, startResetElement, endResetElement);
        this.#countSwitcher = new CountSwitcher(displayElement, playElement, pauseElement, startResetElement, endResetElement)
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    endReset() {
        this.#countSwitcher.endReset();
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    pause() {
        this.#countSwitcher.pause();
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    start() {
        const callback = currentTime => () => {
            currentTime.time++
        };
        this.#countSwitcher.startWithCallback(callback);
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    startReset() {
        this.#countSwitcher.startReset();
    }

    /**
     * @function
     * @public
     * @override
     * @return {string}
     */
    template() {
        return this.#countSwitcher.template();
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    initial() {
        this.#countSwitcher.initial();
    }

    /**
     * @private
     * @type {CountSwitcher}
     */
    #countSwitcher;
}