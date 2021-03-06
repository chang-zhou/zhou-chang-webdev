(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function createWebsite(website) {
            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = 'website name is required';
                return;
            }

            websiteService
                .createWebsite(model.userId, website)
                .then(renderWebsite)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();