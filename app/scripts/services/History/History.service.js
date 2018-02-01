angular
.module('HYSApp')
.service('History', function (moment, $resource) {
    this.history = [];

    this.mapObject = function (object) {
        var date = moment().format("YYYY-MM-DD");

        Object.defineProperty(object, 'date', {
            value: date,
            writable: true,
            configurable: true,
            enumerable  : true
        });

        return object;
    };

    this.getHistory = function () {
        return $resource('http://localhost:3000/history', {}, {
            getHistory: {method: 'GET', isArray: true}
        })
    }
});