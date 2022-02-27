import {AbstractSwitcher} from "./";

/**
 * @class
 */
export class CountSwitcher extends AbstractSwitcher {
    /**
     * @constructor
     */
    constructor(displayElement, playElement, pauseElement, startResetElement, endResetElement) {
        super(displayElement, playElement, pauseElement, startResetElement, endResetElement);

        this.#currentTime = new Proxy({time: 0, displayElement}, {
            set(item, property, value) {
                if (property === 'time' && typeof value === 'number' && value >= 0 && Number.isInteger(value)) {
                    item[property] = value;
                    displayElement.innerHTML = CountSwitcher.#timeTemplate(item[property]);
                    return true;
                } else return false;
            },
        });
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    endReset() {
        this.endResetElement.disabled = true;
        this.pauseElement.disabled = true;
        this.startResetElement.disabled = true;

        clearInterval(this.interval);
        this.interval = null;
        this.#changeInputElement();

        this.playElement.disabled = false;
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
        this.startResetElement.disabled = false;
        this.endResetElement.disabled = false;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    start() {
        throw new SyntaxError('Метод start необходимо переопределить!');
    }

    /**
     * @function
     * @public
     * @param {Function} callback
     * @return {void}
     */
    startWithCallback(callback) {
        this.playElement.disabled = true;

        if (this.interval === null) this.#endTime = this.#currentTime.time;

        this.interval = setInterval(callback(this.#currentTime), 1000)

        this.pauseElement.disabled = false;
        this.startResetElement.disabled = false;
        this.endResetElement.disabled = false;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    startReset() {
        this.startResetElement.disabled = true;
        this.pauseElement.disabled = true;

        clearInterval(this.interval);
        this.interval = null;
        this.#currentTime.time = this.#endTime;

        this.playElement.disabled = false;
        this.endResetElement.disabled = false;
    }

    /**
     * @function
     * @public
     * @override
     * @return {string}
     */
    template() {
        return `                    <legend>StartTime</legend>
                    <div class="timer__inputs d-flex">
                        <input type="number" id="${CountSwitcher.#ID_HOURS}" class="timer__input form-control" value="0" min="0" max="${AbstractSwitcher.MAX_HOURS}" />
                        <input type="number" id="${CountSwitcher.#ID_MINUTES}" class="timer__input form-control" value="0" min="0" max="59"/>
                        <input type="number" id="${CountSwitcher.#ID_SECONDS}" class="timer__input form-control" value="0" min="0" max="59"/>
                    </div>`;
    }

    /**
     * @function
     * @public
     * @override
     * @return {void}
     */
    initial() {
        this.#hoursElement = document.querySelector(`#${CountSwitcher.#ID_HOURS}`);
        this.#minutesElement = document.querySelector(`#${CountSwitcher.#ID_MINUTES}`);
        this.#secondsElement = document.querySelector(`#${CountSwitcher.#ID_SECONDS}`);

        this.#hoursElement.addEventListener('change', () => {
            const value = +this.#hoursElement.value,
                newValue = (Math.floor(Math.abs(+value)) % AbstractSwitcher.MAX_HOURS);
            this.#hoursElement.value = newValue.toString();

            this.#changeInputElement();
        });

        this.#minutesElement.addEventListener('change', () => {
            const value = +this.#minutesElement.value,
                newValue = (Math.floor(Math.abs(value)) % AbstractSwitcher.SECONDS_IN_HOUR);
            this.#minutesElement.value = newValue.toString();

            this.#changeInputElement();
        });

        this.#secondsElement.addEventListener('change', () => {
            const value = +this.#secondsElement.value,
                newValue = (Math.floor(Math.abs(value)) % AbstractSwitcher.SECONDS_IN_MINUTE);
            this.#secondsElement.value = newValue.toString();

            this.#changeInputElement();
        });

        this.#changeInputElement();

        this.playElement.disabled = false;
        this.pauseElement.disabled = true;
    }

    /**
     * @const
     * @static
     * @private
     * @type {string}
     */
    static #ID_HOURS = 'hours';

    /**
     * @const
     * @static
     * @private
     * @type {string}
     */
    static #ID_MINUTES = 'minutes';

    /**
     * @static
     * @private
     * @type {string}
     */
    static #ID_SECONDS = 'seconds';

    /**
     * @private
     * @type {number}
     */
    #endTime = 0;

    /**
     * @private
     * @type {{displayElement, time: number}}
     */
    #currentTime;

    /**
     * @private
     * @type {HTMLInputElement}
     */
    #hoursElement;

    /**
     * @private
     * @type {HTMLInputElement}
     */
    #minutesElement;

    /**
     * @private
     * @type {HTMLInputElement}
     */
    #secondsElement;

    /**
     * @function
     * @static
     * @private
     * @param {number} currentTime
     * @return {string}
     */
    static #timeTemplate(currentTime) {
        const hours = Math.floor(currentTime / AbstractSwitcher.SECONDS_IN_HOUR).toString(),
            minutes = Math.floor((currentTime % AbstractSwitcher.SECONDS_IN_HOUR) / AbstractSwitcher.SECONDS_IN_MINUTE).toString(),
            seconds = (currentTime % AbstractSwitcher.SECONDS_IN_MINUTE).toString();

        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    }

    /**
     * @function
     * @private
     * @return {void}
     */
    #changeInputElement() {
        if (this.interval === null) {
            const hours = +this.#hoursElement.value,
                minutes = +this.#minutesElement.value,
                seconds = +this.#secondsElement.value;

            this.#currentTime.time = hours * AbstractSwitcher.SECONDS_IN_HOUR + minutes * AbstractSwitcher.SECONDS_IN_MINUTE + seconds;
        }
    }
}