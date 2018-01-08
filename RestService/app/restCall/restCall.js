(function () {
    'use strict';
    var controllerId = 'rest';
    angular.module('app').controller(controllerId, ['common', '$scope', 'datacontext', rest]);

    function rest(common, $scope, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var $s = $scope;
        $s.showAnswer = false;


        vm.title = 'You can get cars and add a car';

        activate();



        function activate() {
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Rest Call!!'); });
        }

        $s.getCars = function () {
            getCars();
            $s.showAnswer = true;
        };

        $s.addCar = function () {
            var today = new Date();
            var car = {
                ID: null,
                Color: "Black",
                Make: "Chevy",
                Model: "Corvette",
                Year: today
            };
            addNewCar(car);
            $s.showAnswer = true;
        };

        function addNewCar(car) {
            return datacontext.addCar(car).then(function (data) {
                return vm.result = data;
            });
        }

        function getCars() {
            return datacontext.getCars().then(function (data) {
                return vm.data = data;
            });
        }
    }
})();