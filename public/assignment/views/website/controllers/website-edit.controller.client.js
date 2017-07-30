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
        model.updateWebsite = updateWebsite;

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

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.userId, model.websiteId)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }

        function updateWebsite() {
            var website = model.website;
            if(website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = 'website name is required';
                return;
            }
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
})();