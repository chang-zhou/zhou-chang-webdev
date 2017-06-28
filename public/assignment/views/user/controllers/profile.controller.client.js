(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        userService
            .findUserById(model.userId)
            .then(renderUser, userError);

        model.websites = websites;

        function websites() {
            $location.url('/user/' + model.userId + "/website");
        }

        function renderUser (user) {
            model.user = user;
        }

        function userError() {
            model.error = "User not found";
        }
    }
})();