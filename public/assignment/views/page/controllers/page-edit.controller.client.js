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
        model.updatePage = updatePage;

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
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }

        function updatePage() {
            var page = model.page;
            if(page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = 'page name is required';
                return;
            }
            pageService
                .updatePage(model.pageId, page)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });
        }
    }
})();