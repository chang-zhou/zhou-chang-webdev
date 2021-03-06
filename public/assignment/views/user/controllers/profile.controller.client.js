(function () {
    angular
        .module('WebAppMaker')
        .controller('profileController', profileController);
    
    function profileController($location, currentUser, userService) {

        var model = this;

        model.userId = currentUser._id;

        model.websites = websites;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.updateUser = updateUser;

        function init() {
            renderUser(currentUser);
        }
        init();

        function websites() {
            $location.url('/user/' + model.userId + "/website");
        }

        function renderUser (user) {
            model.user = user;
        }

        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(function (status) {
                    $location.url("/login");
                })
        }

        function updateUser() {
            userService
                .updateUser(model.user)
                .then(function (status) {
                    $location.url("/profile");
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();