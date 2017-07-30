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
        model.widgetId = 'default';

        model.widgetUrl = widgetUrl;
        model.deleteWidget = deleteWidget;
        model.uploadURL = uploadURL;
        model.createWidget = createWidget;

        function widgetUrl(widgetType) {
            var url = 'views/widget/editors/widget-'+widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }

        function createWidget(widget) {
            if(widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                model.error = 'name is required';
                return;
            }

            widgetService.createWidget(model.pageId, widget, model.widgetType)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                })
        }

        function deleteWidget(widgetId) {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
        }

        function uploadURL(widgetId, imageUrl) {
            var image = widgetService.findWidgetById(model.widgetId);
            image.url = imageUrl;
            widgetService.createWidget(model.pageId, image, model.widgetType)
                .then(function (status) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget')
                });
        }
    }
})();