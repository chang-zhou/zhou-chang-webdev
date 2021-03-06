(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetChooserController', widgetChooserController);

    function widgetChooserController($routeParams) {
        var model = this;

        var widgetTypes = [
            "HEADING",
            "IMAGE",
            "YOUTUBE",
            "HTML",
            "INPUT"
        ];

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.widgetTypes = widgetTypes;
    }
})();