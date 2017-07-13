(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($routeParams,
                                   $location,
                                   pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }
        init();

        function renderPages(pages){
            model.pages = pages;
        }

        function renderPage(page) {
            model.page = page;
        }

        function deletePage(pageId) {
            pageService
                .deletePage(model.websiteId, pageId)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page')
                });
        }
    }
})();