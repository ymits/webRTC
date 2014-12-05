import app = require('app')
import pubCtr = require('controllers/publisherController')
import subCtr = require('controllers/subscriberController')

app.config(($routeProvider:ng.route.IRouteProvider) => {
    $routeProvider
        .when('/publisher', {
            controller: pubCtr,
            templateUrl: '/html/publisher.html'
        })
        .when('/subscriber', {
            controller: subCtr,
            templateUrl: '/html/subscriber.html'
        });
});