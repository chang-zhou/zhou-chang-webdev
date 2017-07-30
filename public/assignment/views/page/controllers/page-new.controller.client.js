(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController', pageNewController);
    
    function pageNewController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
        }
        init();

        function renderPages(pages){
            model.pages = pages;
        }

        function renderPage(page) {
            model.page = page;
        }

        function createPage(page) {
            if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'page name is required';
                return;
            }

            pageService
                .createPage(model.websiteId, page)
                .then(renderPage)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();