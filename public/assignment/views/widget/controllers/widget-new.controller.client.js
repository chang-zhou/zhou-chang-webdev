(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams) {
        var model = this;

        var widgets = [
            {"_id": "123", "name": "Header", "widgetType": "HEADING"},
            {"_id": "345", "name": "Image", "widgetType": "IMAGE"},
            {"_id": "678", "name": "Youtube", "widgetType": "YOUTUBE"}
        ];

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.widgets = widgets;
    }
})();