(function () {

    'use strict';

    angular.module('root')

            .filter('capitalize', function () {

                return function (input, scope) {
                    if (input != null)
                        return input.substring(0, 1).toUpperCase() + input.substring(1);
                }

            })

            .filter('markdown', function () {
                var converter = new Showdown.converter();
                return converter.makeHtml;
            });

})();