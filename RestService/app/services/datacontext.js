(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', 'serviceHelperFactory', datacontext]);

    function datacontext(common, serviceHelperFactory) {
        var $q = common.$q;
        var cars = serviceHelperFactory.GetCars;
        var newcar = serviceHelperFactory.AddCar;
        var service = {
            getCars: getCars,
            addCar: addCar
        };

        return service;

        function addCar(car) {
            var ret = createCar(car).then(function (data) {
                return data;
            });
            return $q.when(ret);
        }

        function getCars() {
            var ret = returnCars().then(function (data) {
                return data.GetCarsResult;
            });
            return $q.when(ret);
        }

        function returnCars() {
            return cars.requestCall().$promise;
        }

        function createCar(car) {
            return newcar.requestCall(car).$promise;
        }
    }
})();