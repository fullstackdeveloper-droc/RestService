(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/guess/guess.html',
                    title: 'guess',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Guess Game'
                    }
                }
            }, {
                url: '/chess',
                config: {
                    title: 'chess',
                    templateUrl: 'app/chess/chess.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Chess'
                    }
                }
            }, {
                url: '/restCall',
                config: {
                    title: 'restCall',
                    templateUrl: 'app/restCall/restCall.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-car"></i> Make Rest Call'
                    }
                }
            }
        ];
    }
})();