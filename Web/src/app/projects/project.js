(function () {
    'use strict';

    var controllerId = 'projectController';
    angular.module('app').controller(controllerId, ['common', 'broadcaster', projectController]);

    function projectController(common, broadcaster) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.features = [];
        var features = [];
        activate();

        function activate() {

            features.push({
                id: 1,
                title: 'Login',
                goal: 'In order to access my account',
                actor: 'As a user of the website',
                action: 'I want to log into the website',
                status: 'pass',
                expand: false,
                scenarios: [
                    {
                        id: 1,
                        title: 'Logging in with valid credentials',
                        status: 'pass',
                        steps: [
                                            { id: 1, type: 'given', title: 'Given I am at the login page', status: 'pass' },
                                            { id: 2, type: 'when', title: 'When I fill in the following form', status: 'pass' },
                                            { id: 3, type: 'then', title: 'Then I should be at the home page', status: 'pass' }
                                        ]
                    }
                ]
            });

            features.push({
                id: 2,
                title: 'Logout',
                goal: 'In order to secure my account',
                actor: 'As a user of the website',
                action: 'I want to log out from the website',
                status: 'fail',
                expand: false,
                scenarios: [
                    {
                        id: 2,
                        title: 'Logout with valid credentials',
                        status: 'fail',
                        steps: [
                                            { id: 1, type: 'given', title: 'Given I am logged in', status: 'pass' },
                                            { id: 2, type: 'when', title: 'When I click on the log out button', status: 'pass' },
                                            { id: 3, type: 'then', title: 'Then I should be at the log in screen', status: 'fail' }
                                        ]
                    }
                ]
            });

            features.push({
                id: 3,
                title: 'Search for feature',
                goal: 'In order to find a feature',
                actor: 'As a user of the website',
                action: 'I want to be able to search for a feature',
                status: '',
                expand: false,
                scenarios: []
            });

            vm.features = features;

            common.activateController([], controllerId)
                .then(function () { log('Activated Dashboard View'); });
        };

        vm.showSenarios = function (featureId) {
            vm.features[featureId].expand = true;
        };

        broadcaster.onSearchProject(function (event, searchTerm) {
            if (searchTerm.length == 0) {
                vm.features = features;
            } else {
                vm.features = [];
                features.forEach(function (feature) {
                    if (feature.title.toLowerCase().indexOf(searchTerm) > -1) {
                        vm.features.push(feature);
                    };
                });
            }
        });

    };
})();
