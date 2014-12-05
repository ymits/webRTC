require.config({
    paths: {
        angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-route'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    }
});

require(['angular', 'angular-route'], (angular, route) => {
    require(['app', 'appRouteConfig'], (app, appRouteConfig) => {
        angular.bootstrap(document, ['webRTCApp']);
    });
});