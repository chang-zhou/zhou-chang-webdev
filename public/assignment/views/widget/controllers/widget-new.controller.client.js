(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams,
                                  $location,
                                  widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetType = $routeParams['widgetType'];

        model.widgetUrl = widgetUrl;
        model.deleteWidget = deleteWidget;
        model.uploadImage = uploadImage;
        model.createWidget = createWidget;

        function widgetUrl(widgetType) {
            var url = 'views/widget/creators/widget-'+widgetType.toLowerCase()+'-new.view.client.html';
            return url;
        }

        function createWidget(widget) {
            widgetService.createWidget(model.pageId, widget, model.widgetType)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                })
        }

        function deleteWidget(widgetId) {
            widgetService.deleteWidget(widgetId)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                });

        }

        function uploadImage(widgetId, imageUrl) {
            var image = widgetService.findWidgetById(model.widgetId);
            image.url = imageUrl;
            widgetService.updateWidget(widgetId, image)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                });
        }
    }
})();