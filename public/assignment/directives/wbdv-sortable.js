(function () {
    angular
        .module('WebAppMaker',['ngRoute'])
        .directive('wdDraggable', wdDraggable);
    
    function wdDraggable($http) {
        function linkFunction(scope, element) {
            var index1, index2;
            $(element).sortable({
                start: function(event, ui) {
                    index1 = ui.item.index();
                },
                update: function(event, ui) {
                    index2 = ui.item.index();
                    $http.put("/page/:pageId/widget?initial="+index1+"&final="+index2);
                }
            });
        }
        return {
            link: linkFunction
        }
    }
})();