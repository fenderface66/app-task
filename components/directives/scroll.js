;
(function() {


    'use strict';
    angular.module('app-task')
        .directive('scroll', scroll);


    function scroll($window) {
        // Collect doc height and compare to windowHeight + window.pageYOffset
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body,
                    html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                    windowBottom = Math.ceil(windowBottom);
                if (windowBottom >= (docHeight - 30)) {
                    scope.loadMore();

                }
            });
        };
    }

})();
