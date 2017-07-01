(function () {
    angular
        .module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                   $location,
                                   websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
            model.website = websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId)
                .then($location.url('/user/'+model.userId+'/website'));
        }
    }
})();