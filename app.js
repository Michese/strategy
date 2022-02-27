import {SwitcherFacade, ClockSwitcher, CountDownSwitcher, CountUpSwitcher} from "./controller";

(function () {
    const switcherItems = [
        {id: 'clock', title: 'Clock', Constructor: ClockSwitcher},
        {id: 'count_down', title: 'Count Down', Constructor: CountDownSwitcher},
        {id: 'count_up', title: 'Count Up', Constructor: CountUpSwitcher},
    ];

    new SwitcherFacade(switcherItems);
})()