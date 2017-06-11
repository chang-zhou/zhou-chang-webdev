(function() {
    angular
        .module('WebAppMaker')
        .service('pageService', pageService);

    function pageService() {
        this.createPage = createPage;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.deletePage = deletePage;
        this.updatePage = updatePage;

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var results = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    results.push(pages[p]);
                }
            }
            return results;
        }
        
        function findPageById(pageId) {
            return pages.find(function(page){
                return page._id === pageId;
            });            
        }

        function deletePage(pageId){
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function updatePage(pageId, page) {
            deletePage(pageId);
            page._id = pageId;
            pages.push(page);
        }
    }
})();