require.config({
    paths: {
        'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular',
        'angular-route': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular-route',
        'socket.io': "/socket.io/socket.io"
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'socket.io':{
            exports: 'io'
        }
    }
});

require(['angular', 'angular-route', 'socket.io'], (angular, route, io) => {
    require(['app', 'appRouteConfig'], (app, appRouteConfig) => {
        angular.bootstrap(document, ['webRTCApp']);
    });
});