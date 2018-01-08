(function () {
    'use strict';

    var serviceId = 'serviceHelperFactory';
    angular.module('app').factory(serviceId, ['common', '$resource', serviceHelperFactory]);

    function serviceHelperFactory(common, $resource) {
        return {
            GetCars: $resource('http://localhost:57958/RestService.svc/GetCars', null, {
                requestCall: {
                    method: 'get' // this method issues a PUT request
                }
            }),
            AddCar: $resource('http://localhost:57958/RestService.svc/AddCar', null, {
                requestCall: {
                    method: 'post' // this method issues a PUT request
                }
            })
        }
    }
})();