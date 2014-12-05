import angular = require("angular")

var app:ng.IModule = angular.module('webRTCApp', ['ngRoute']);
app.filter('trusted', ($sce:ng.ISCEService) => {
    return (url) => {
        return $sce.trustAsResourceUrl(url);
    };
});
export = app;