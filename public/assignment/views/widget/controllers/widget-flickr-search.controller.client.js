(function () {
    angular
        .module('WebAppMaker')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams,
                                  $location,
                                  flickrService,
                                  widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();

        function renderWidget(widget) {
            model.widget = widget;
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = model.widget;
            widget.url = url;
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget')
                );

        }



    }
})();
