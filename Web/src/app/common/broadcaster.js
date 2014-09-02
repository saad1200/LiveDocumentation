(function () {
    'use strict';

    angular.module('common').factory('broadcaster', ['$rootScope', 'commonConfig', broadcaster]);

    function broadcaster($rootScope, commonConfig) {

        function broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function on(eventName, callback) {
            return $rootScope.$on(eventName, callback);
        }

        function controllerActivated(controllerId) {
            broadcast(commonConfig.config.controllerActivateSuccessEvent, controllerId);
        }

        //search project
        var searchProjectEventName = 'searchProject';
        function searchProject(searchTerm) {
            broadcast(searchProjectEventName, searchTerm);
        }

        function onSearchProject(callback) {
            return on(searchProjectEventName, callback);
        }

        return {
            controllerActivated: controllerActivated,
            searchProject: searchProject,
            onSearchProject: onSearchProject
        };
    }

})();
