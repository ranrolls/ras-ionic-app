(function() {

  'use strict';

  var intervalTimer = 300;
  var intervalHandler;

  var operation = false;

  function updateTime(scope, elem, attrs) {

    if (operation) {
      return false;
    }
    //        $interval.cancel(intervalHandler);
    var wH = $(window).height(); // device height
    var cH = wH - $(".bar-header").height(); // container height
    var bH = cH - $(".bar-footer").height(); // box height
    var cCh = $(elem).find("#center-child").height(); // object height
    // console.log('wH = ' + wH + ' cH = ' + cH + ' bH = ' + bH + ' cCh = ' + cCh);
    var elemChild = $(elem).find("#center-child"); // object

    if (attrs.verticalAlign == "center-box") {

            if(typeof device === 'undefined'){
              return false;
            }
      if (device.platform == 'android' || device.platform == 'Android') {

        var bHpx = bH + "px";
        var mTop = ((bH - cCh) / 2) + 20;
        var mTopPx = mTop + 'px';

        $(elem).css("height", bHpx);
        $(elem).css("max-height", bHpx);
        $(elemChild).css("height", bHpx);
        $(elemChild).css("margin-top", mTopPx);

      } else if(device.platform == 'IOS' || device.platform == 'iOS' || device.platform == 'ios'){

        var bHpx = bH + "px";
        var mTop = (bH > cCh) ? ((bH - cCh) / 2) : 0;
        var mTopPx = mTop + 'px';

        $(elem).css("height", bHpx);
        $(elem).css("max-height", bHpx);
        $(elemChild).css("max-height", bHpx);

        if (mTop < 20) {
          $(elemChild).css("margin-top", 20 + "px");
        } else {
          $(elemChild).css("margin-top", mTopPx);
        }
      }else{
        var bHpx = bH + "px";
        var mTop = (bH > cCh) ? ((bH - cCh) / 2) : 0;
        var mTopPx = mTop + 'px';

        $(elem).css("height", bHpx);
        $(elem).css("max-height", bHpx);
        $(elemChild).css("max-height", bHpx);

        if (mTop < 20) {
          $(elemChild).css("margin-top", 20 + "px");
        } else {
          $(elemChild).css("margin-top", mTopPx);
        }
      }
    }

    if (attrs.verticalAlign == "center") {

      var wHpx = wH + "px";
      var mTop = (wH > cCh) ? ((wH - cCh) / 2) : 0;
      var mTopPx = mTop + 'px';
      $(elem).css("height", wHpx);
      $(elem).css("max-height", wHpx);
      $(elemChild).css("max-height", wHpx);
      $(elemChild).css("margin-top", mTopPx);
      $(elemChild).css("margin-top", mTopPx);

    }

    if (attrs.verticalAlign == "center-with-head") {

      var cHpx = cH + "px";
      var mTop = (cH > cCh) ? ((cH - cCh) / 2) : 0;
      var mTopPx = mTop + 'px';
      //        console.log(cHpx);
      $(elem).css("height", cHpx);
      $(elem).css("max-height", cHpx);
      $(elemChild).css("max-height", cHpx);
      $(elemChild).css("margin-top", mTopPx);
      $(elemChild).css("margin-top", mTopPx);
    }

    if (attrs.verticalAlign == "parent") {
      var p = $(elem).css("height");
      var pC = $(elem).find("#center-child");
      var pCh = $(pC).height();

      var mTop = (p > pCh) ? ((p - pCh) / 2) : 0;
      var mTopPx = mTop + 'px';

      $(pC).css("margin-top", mTopPx); //.css( "color", "red" );

    }

    setTimeout(function() {
      $(elemChild).css("opacity", 1);
    }, 1000);

    operation = true;

  }

  angular.module('root').directive('verticalAlign', ['$timeout', verticalAlign]);

  function verticalAlign($timeout) {
    // Usage:
    // <div data-markdown="{{vm.content}}"></div>
    return {
      // Restrict it to be an attribute in this case
      restrict: 'A',
      // responsible for registering DOM listeners as well as updating the DOM
      link: function(scope, elem, attrs) {
        $(document).ready(function() {
          $timeout(function() { // You might need this timeout to be sure its run after DOM render.
            updateTime(scope, elem, attrs);
          }, intervalTimer, false);
        });
      }
    };
  }

  angular.module('root').directive('repeatHref', ['$location', repeatHref]);

  function repeatHref($location) {
    // Usage:
    // <div data-markdown="{{vm.content}}"></div>
    return {
      // Restrict it to be an attribute in this case
      restrict: 'A',
      // responsible for registering DOM listeners as well as updating the DOM
      link: function(scope, element, attr) {
        var url = attr.repeatHrefPrefix + attr.repeatHrefValue;

        element.attr("href", attr.repeatHrefPrefix + attr.repeatHrefValue);
        element.on('click', function() {

        });
        //
      }
    };
  }

  angular.module('root').directive('parseFbHtml', ['$timeout', '$compile', '$rootScope', parseFbHtml]);

  function parseFbHtml($timeout, $compile, $rootScope) {

    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var temp;
        $(element).css('visibility', 'hidden');
        $timeout(function() { // You might need this timeout to be sure its run after DOM render.
          scope.$apply(function() {
            $.each($.parseHTML($(element).html()), function(index, value) {
              $.each(value, function(i1, v1) {
                if ($.type(v1) === "string" && v1.length > 20) {
                  temp = $.parseHTML(v1);
                  $.each(temp, function(i2, v2) {
                    $.each(v2, function(i3, v3) {
                      if ($.type(v3) === "string" && v3.length > 20) {
                        temp = $.parseHTML(v3);
                        return false;
                      }
                    });
                  });
                  return false;
                }
              });
            });
          });
          $(element).html("");
          $(element).append(temp);
          $(element).css('visibility', 'visible');
        }, 2000, false);
      }
    };
  }



  angular.module('root').directive('parseHtmlRe', ['$timeout', '$compile', '$rootScope', parseHtmlRe]);

  function parseHtmlRe($timeout, $compile, $rootScope) {
    // var intervalTimer = 300;
    // return function(scope, element, attrs) {
    //     scope.$watch(
    //       function(scope) {
    //          // watch the 'compile' expression for changes
    //         return scope.$eval(attrs.dynamic);
    //       },
    //       function(value) {
    //         // when the 'compile' expression changes
    //         // assign it into the current DOM
    //         element.html(value);
    //
    //         // compile the new DOM and link it to the current
    //         // scope.
    //         // NOTE: we only compile .childNodes so that
    //         // we don't get into infinite loop compiling ourselves
    //         $compile(element.contents())(scope);
    //       }
    //     );
    //   };// return ends here
    return {
      template: '<div>{{html}}</div>',
      // scope :{html:'='},
      restrict: 'A',
      // transclude = true,
      // replace: true,
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {},
          // post: function postLink(scope, iElement, iAttrs, controller) {
          post: function postLink(scope, ele, attrs, controller) {

            var element = $compile('<p>{{total}}</p>')(scope);
            console.log(element);
            // console.log('in links');
            // scope.$watch(attrs.dynamic, function(html) {
            //   console.log('scope changed');
            //   ele.html(html);
            //   $compile(ele.contents())(scope);
            // });


            // console.log(iAttrs);
            // console.log(angular.element(iElement));
            // console.log(iElement);
            // console.log(iElement[0]);
            // console.log(scope.html);
            // console.log(iElement[0].firstChild);
            // console.log(iElement.context);
            // console.log(iElement.context.firstChild);
            // console.log(iElement.context.innerHTML);
            // var content = iElement.;

            // console.log(content);
            // console.log(scope.html);
            // console.log(html);
          }
        }
      },
      link: function(scope, ele, attrs) {
        // console.log('in links');
        // scope.$watch(attrs.dynamic, function(html) {
        //   console.log('scope changed');
        //   ele.html(html);
        //   $compile(ele.contents())(scope);
        // });

        // var template = angular.element($compile(html)(scope));
        // var in = ;
        //     //$compile(template)(scope);
        // console.log(attr);
        // console.log(template);

        // console.log(element);
        // element.replaceWith(template);
      }
    };
  } // parseHtmlRe ends here

  angular.module('root').directive('parseHtml', ['$timeout', '$compile', '$rootScope', parseHtml]);

  function parseHtml($timeout, $compile, $rootScope) {
    var intervalTimer = 1000;
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var temp;
        $(element).css('visibility', 'hidden');
        $timeout(function() { // You might need this timeout to be sure its run after DOM render.
          scope.$apply(function() {
            $.each($.parseHTML($(element).html()), function(index, value) {
              $.each(value, function(i1, v1) {
                if ($.type(v1) === "string" && v1.length > 20) {
                  temp = $.parseHTML(v1);
                  $.each(temp, function(i2, v2) {
                    $.each(v2, function(i3, v3) {
                      if ($.type(v3) === "string" && v3.length > 20) {
                        temp = $.parseHTML(v3);
                        return false;
                      }
                    });
                  });
                  return false;
                }
              });
            });
          });
          $(element).html("");
          $(element).append(temp);
          $(element).css('visibility', 'visible');
          // $(element).find('a').click(function(e){
          //   console.log(e.target.getAttribute('href').substr(0,4), ' from parse html');
          //   if(e.target.getAttribute('href').substr(0,4) == 'tel:') return;
          //   $rootScope.$broadcast('exLink', {
          //     'url': e.target.getAttribute('href')
          //   });
          //   return false;
          // });
        }, intervalTimer, false);
      }
    };
  }

  angular.module('root').directive('parseHtmlLinks', ['$rootScope', '$cordovaInAppBrowser', '$ionicLoading', '$ionicModal', '$window', '$document',
    '$timeout', '$compile', 'GlobalVariables', 'toastr', parseHtmlLinks
  ]);

  function parseHtmlLinks($rootScope, $cordovaInAppBrowser, $ionicLoading, $ionicModal, $window, $document, $timeout, $compile, GlobalVariables, toastr) {

    var intervalTimer = 300;

    return {
      restrict: 'A',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {},
          post: function postLink(scope, iElement, iAttrs, controller) {
            var temp;
            var el = $(tElement);

            el.css('visibility', 'hidden');
            el.addClass('slabthing');

            $timeout(function() { // You might need this timeout to be sure its run after DOM render.
              scope.$apply(function() {
                $.each($.parseHTML($(tElement).html()), function(index, value) {
                  $.each(value, function(i1, v1) {
                    if ($.type(v1) === "string" && v1.length > 20) {
                      temp = $.parseHTML(v1);
                      $.each(temp, function(i2, v2) {
                        $.each(v2, function(i3, v3) {
                          if ($.type(v3) === "string" && v3.length > 20) {
                            temp = $.parseHTML(v3);
                            return false;
                          }
                        });
                      });
                      return false;
                    }
                  });
                });
              });
              el.html("");
              el.append(temp);
              el.css('visibility', 'visible');
              $timeout(function() { // You might need this timeout to be sure its run after DOM render.
                scope.$apply(function() {
                  $.each($(el).find('a'), function(index, value) {
                    // console.log(this.href.substr(0,4) , 'parse  html links');
                    if (this.href.substr(0, 4) == 'tel:') return;
                    //console.log(this.href);
                    this.setAttribute("openbrowser", this.href);
                    //this.setAttribute("ng-click", "lc.openBrowser('" + this.href + "')");
                    this.setAttribute("target", "");
                    this.setAttribute("href", "");
                    //this.setAttribute("id", "");
                    this.setAttribute("class", "openbrowser");
                    this.setAttribute("onclick", "return false;");

                  });

                  angular.element('.openbrowser').on('click', function(e) {
                    try {
                      $rootScope.$broadcast('exLink', {
                        'url': e.target.getAttribute('openbrowser')
                      });
                    } catch (e) {
                      toastr.error('iframe');
                    }
                  });
                });
              }, intervalTimer, false);
            }, intervalTimer, false);
          }
        }
      },
      link: function(scope, element, attr) {}
    };
  }

  angular.module('root').directive('parseHtmlLinks2', ['$rootScope', '$cordovaInAppBrowser', '$ionicLoading', '$ionicModal', '$window', '$document',
    '$timeout', '$compile', 'GlobalVariables', 'toastr', parseHtmlLinks2
  ]);

  function parseHtmlLinks2($rootScope, $cordovaInAppBrowser, $ionicLoading, $ionicModal, $window, $document, $timeout, $compile, GlobalVariables, toastr) {

    var intervalTimer = 300;

    return {
      restrict: 'A',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {},
          post: function postLink(scope, iElement, iAttrs, controller) {
            var temp;
            var el = $(tElement);

            el.css('visibility', 'hidden');
            el.addClass('slabthing');

            $timeout(function() { // You might need this timeout to be sure its run after DOM render.
              scope.$apply(function() {
                $.each($.parseHTML($(tElement).html()), function(index, value) {
                  $.each(value, function(i1, v1) {
                    if ($.type(v1) === "string" && v1.length > 20) {
                      temp = $.parseHTML(v1);
                      $.each(temp, function(i2, v2) {
                        $.each(v2, function(i3, v3) {
                          if ($.type(v3) === "string" && v3.length > 20) {
                            temp = $.parseHTML(v3);
                            return false;
                          }
                        });
                      });
                      return false;
                    }
                  });
                });
              });
              el.html("");
              el.append(temp);
              el.css('visibility', 'visible');
              $timeout(function() { // You might need this timeout to be sure its run after DOM render.
                scope.$apply(function() {
                  $.each($(el).find('a'), function(index, value) {
                    console.log(this.href.substr(0, 4), 'parse  html links 2');
                    if (this.href.substr(0, 4) == 'tel:') return;
                    //console.log(this.href);
                    this.setAttribute("openbrowser", this.href);
                    //this.setAttribute("ng-click", "lc.openBrowser('" + this.href + "')");
                    this.setAttribute("target", "");
                    this.setAttribute("href", "");
                    //this.setAttribute("id", "");
                    this.setAttribute("class", "openbrowser");
                    this.setAttribute("onclick", "return false;");

                  });

                  angular.element('.openbrowser').on('click', function(e) {
                    try {
                      $rootScope.$broadcast('exLink', {
                        'url': e.target.getAttribute('openbrowser')
                      });
                    } catch (e) {
                      toastr.error('iframe');
                    }
                  });
                });
              }, intervalTimer, false);
            }, intervalTimer, false);
          }
        }
      },
      link: function(scope, element, attr) {}
    };
  }

  angular.module('root').directive('replaceText', ['$timeout', replaceText]);

  function replaceText($timeout) {

    var intervalTimer = 1000;

    return {
      // Restrict it to be an attribute in this case
      restrict: 'A',
      // responsible for registering DOM listeners as well as updating the DOM
      link: function(scope, element, attr) {
        var temp = "";
        $timeout(function() { // You might need this timeout to be sure its run after DOM render.
          scope.$apply(function() {
            temp = $(element).html();
            //                        console.log(temp);
            if (typeof temp == 'string') {
              temp = temp.replace(attr.replaceTextFrom, attr.replaceTextTo);
            }
            //                        console.log(temp);
          });
          $(element).html("");
          $(element).append(temp);
        }, intervalTimer, false);
        //
      }
    };
  }

  angular.module('root').directive('passwordMatch', [passwordMatch]);

  function passwordMatch() {
    return {
      restrict: 'A',
      scope: true,
      require: 'ngModel',
      link: function(scope, elem, attrs, control) {
        var checker = function() {
          //get the value of the first password
          var e1 = scope.$eval(attrs.ngModel);
          //get the value of the other password
          var e2 = scope.$eval(attrs.passwordMatch);
          return e1 == e2;
        };
        scope.$watch(checker, function(n) {
          control.$setValidity("unique", n);
        });
      }
    };
  }

  angular.module('root').directive('openbrowser', function($ionicGesture) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        //console.log('in openbrowser');
        var handleTap = function(e) {
          // todo: capture Google Analytics here
          //console.log('sending page to ', $attrs.openbrowser);
          var inAppBrowser = window.open(encodeURI($attrs.openbrowser), '_system');
        };
        var tapGesture = $ionicGesture.on('tap', handleTap, $element);
        $scope.$on('$destroy', function() {
          // Clean up - unbind drag gesture handler
          $ionicGesture.off(tapGesture, 'tap', handleTap);
        });
      }
    }
  });


  angular.module('root').directive('parseHtmlLinksNdc', ['$rootScope', '$cordovaInAppBrowser', '$ionicLoading', '$ionicModal', '$window', '$document',
    '$timeout', '$compile', 'GlobalVariables', 'toastr', parseHtmlLinksNdc
  ]);

  function parseHtmlLinksNdc($rootScope, $cordovaInAppBrowser, $ionicLoading, $ionicModal, $window, $document, $timeout, $compile, GlobalVariables, toastr) {

    var intervalTimer = 300;

    return {
      restrict: 'A',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {},
          post: function postLink(scope, iElement, iAttrs, controller) {
            var temp;
            var el = $(tElement);

            el.css('visibility', 'hidden');
            el.addClass('slabthing');

            $timeout(function() { // You might need this timeout to be sure its run after DOM render.
              scope.$apply(function() {
                $.each($.parseHTML($(tElement).html()), function(index, value) {
                  $.each(value, function(i1, v1) {
                    if ($.type(v1) === "string" && v1.length > 20) {
                      temp = $.parseHTML(v1);
                      $.each(temp, function(i2, v2) {
                        $.each(v2, function(i3, v3) {
                          if ($.type(v3) === "string" && v3.length > 20) {
                            temp = $.parseHTML(v3);
                            return false;
                          }
                        });
                      });
                      return false;
                    }
                  });
                });
              });
              el.html("");
              el.append(temp);
              el.css('visibility', 'visible');
              $timeout(function() { // You might need this timeout to be sure its run after DOM render.
                scope.$apply(function() {
                  $.each($(el).find('a'), function(index, value) {
                    // console.log(this.href.substr(0,4) , 'parse  html links');
                    if (this.href.substr(0, 4) == 'tel:') return;
                    //console.log(this.href);
                    this.setAttribute("openbrowser", this.href);
                    // this.setAttribute("ng-click", "ndc.openBrowser('" + this.href + "')");
                    this.setAttribute("target", "");
                    this.setAttribute("href", "");
                    //this.setAttribute("id", "");
                    // this.setAttribute("class", "openbrowser");
                    this.setAttribute("class", "newsDetailBrowser");
                    this.setAttribute("onclick", "return false;");

                  });

                  // angular.element('.openbrowser').on('click', function(e) {
                  //   try {
                  //     $rootScope.$broadcast('exLink', {
                  //       'url': e.target.getAttribute('openbrowser')
                  //     });
                  //   } catch (e) {
                  //     toastr.error('iframe');
                  //   }
                  // });
                });
              }, intervalTimer, false);
            }, intervalTimer, false);
          }
        }
      },
      link: function(scope, element, attr) {}
    };
  }

  angular.module('root').directive('parseHtmlLinksAdc', ['$rootScope', '$cordovaInAppBrowser', '$ionicLoading', '$ionicModal', '$window', '$document',
    '$timeout', '$compile', 'GlobalVariables', 'toastr', parseHtmlLinksAdc
  ]);

  function parseHtmlLinksAdc($rootScope, $cordovaInAppBrowser, $ionicLoading, $ionicModal, $window, $document, $timeout, $compile, GlobalVariables, toastr) {

    var intervalTimer = 300;

    return {
      restrict: 'A',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {},
          post: function postLink(scope, iElement, iAttrs, controller) {
            var temp;
            var el = $(tElement);

            el.css('visibility', 'hidden');
            el.addClass('slabthing');

            $timeout(function() { // You might need this timeout to be sure its run after DOM render.
              scope.$apply(function() {
                $.each($.parseHTML($(tElement).html()), function(index, value) {
                  $.each(value, function(i1, v1) {
                    if ($.type(v1) === "string" && v1.length > 20) {
                      temp = $.parseHTML(v1);
                      $.each(temp, function(i2, v2) {
                        $.each(v2, function(i3, v3) {
                          if ($.type(v3) === "string" && v3.length > 20) {
                            temp = $.parseHTML(v3);
                            return false;
                          }
                        });
                      });
                      return false;
                    }
                  });
                });
              });
              el.html("");
              el.append(temp);
              el.css('visibility', 'visible');
              $timeout(function() { // You might need this timeout to be sure its run after DOM render.
                scope.$apply(function() {
                  $.each($(el).find('a'), function(index, value) {
                    // console.log(this.href.substr(0,4) , 'parse  html links');
                    if (this.href.substr(0, 4) == 'tel:') return;
                    //console.log(this.href);
                    this.setAttribute("openbrowser", this.href);
                    // this.setAttribute("ng-click", "ndc.openBrowser('" + this.href + "')");
                    this.setAttribute("target", "");
                    this.setAttribute("href", "");
                    //this.setAttribute("id", "");
                    // this.setAttribute("class", "openbrowser");
                    this.setAttribute("class", "articleDetailBrowser");
                    this.setAttribute("onclick", "return false;");

                  });

                  // angular.element('.openbrowser').on('click', function(e) {
                  //   try {
                  //     $rootScope.$broadcast('exLink', {
                  //       'url': e.target.getAttribute('openbrowser')
                  //     });
                  //   } catch (e) {
                  //     toastr.error('iframe');
                  //   }
                  // });
                });
              }, intervalTimer, false);
            }, intervalTimer, false);
          }
        }
      },
      link: function(scope, element, attr) {}
    };
  }

})();
