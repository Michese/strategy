import {AbstractFormat} from "./base";

/**
 * @class
 */
export class Hours12Format extends AbstractFormat {

    /**
     * @function
     * @public
     * @override
     * @param {Date} date
     * @return {string}
     */
    getFormatTime(date) {
        return new Intl.DateTimeFormat('ru', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }).format(date);
    }
}