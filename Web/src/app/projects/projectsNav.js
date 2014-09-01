(function () {
    'use strict';

    var controllerId = 'projectsController';
    angular.module('app').controller(controllerId, projectsController);

    function projectsController() {
        var vm = this;
        vm.projects = [];

        activate();

        function activate() {
            vm.projects.push({ id: 1, name: 'Front end project' });
            vm.projects.push({ id: 2, name: 'Specflow project' });
        }
    };
})();
