(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.widgetUrl = widgetUrl;
        model.deleteWidget = deleteWidget;
        model.uploadURL = uploadURL;
        model.createWidget = createWidget;

        function init() {
            model.widget = widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();

        function renderWidget(widget) {
            model.widget = widget;
        }

        function widgetUrl(widget) {
            var url = 'views/widget/editors/widget-'+widget.type.toLowerCase()+'-edit.view.client.html';
            return url;
        }

        function createWidget(widget) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(model.pageId, widgetId)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });

        }

        function uploadURL(widgetId, imageUrl) {
            var image = widgetService.findWidgetById(model.widgetId);
            image.url = imageUrl;
            widgetService.updateWidget(widgetId, image)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
})();