(function() {
	'use strict';

	angular
		.module('app')
		.controller('Repos', Repos);

	Repos.$inject = ['$window', '$routeParams', '$filter', 'Org'];

	/**
	 * Repos controller, brokers organization repos data
	 */
	function Repos($window, $routeParams, $filter, Org) {

		var vm = this;
		var orderBy = $filter('orderBy');

		vm.org = {};
		vm.repos = [];
		vm.order = function(predicate, reverse) {
			vm.repos = orderBy(vm.repos, predicate, reverse);
		};
		vm.viewRepo = function(repo) {
			$window.location.href = '#/organizations/' + vm.org.login + '/repos/' + repo.name;
		};

		/**
		 * Grabs the initial data for the view
		 */
		function init() {

			// TODO: show loading spinner

			var orgLogin = $routeParams.orgLogin.toLowerCase();

			Org.getProfile(orgLogin)
				.then(function(profile) {
					if(profile.id) {

						vm.org = profile;

						Org.getRepos(orgLogin)
							.then(function(repos) {
								vm.repos = repos;
								vm.order('stargazers_count', true);
							});
					}
					else {
						// TODO: show friendly error message
						alert('Sorry, the organization you entered could not be retrieved.');
					}
				});
		}

		init();
	}
})();