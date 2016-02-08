
(function () {

    'use strict';

    angular.module('common.services').factory('GlobalUrl', [GlobalUrl]);

    function GlobalUrl() {

        self.domain = 'http://rasmentorshipforum.com/webservice/';

        function getUrl(params) {
            switch (params) {
                case 'login':
                    return self.domain + 'login.php?action=login';
                    break;

                case 'articles':
                    return self.domain + 'articlewebservice.php?action=articlelist';
                    break;

                case 'articlesd':
//  articlewebservice.php?action=articlelist_by_id&cid=68
                    return self.domain + 'articlewebservice.php?action=articlelist_by_id';
                    break;

                case 'news':
//  news.php?action=newsdetails&number=1
                    return self.domain + 'news.php?action=newsdetails';
                    break;

                case 'newsd':
//  news.php?action=newsdetails_by_id&cid=14
                    return self.domain + 'news.php?action=newsdetails_by_id';
                    break;

                case 'about-us':
                    return self.domain + 'aboutus.php';
                    break;

                case 'about-us-content':
                    return self.domain + 'aboutus1.php';
                    break;

                case 'forgot_pasword_email':
                    return self.domain + 'forgotpassword.php';
                    break;

                case 'registration':
                    return self.domain + 'userregistration.php';
                    break;

                case 'forgot_pasword_verify':
                    return self.domain + 'forgotpassword.php?mode=verifytoken';
                    break;

                case 'forgot_pasword_reset':
                    return self.domain + 'forgotpassword.php?mode=setpassword';
                    break;

                case 'edit_profile':
                    return self.domain + 'userregistration.php?action=editprofile';
                    break;

                case 'contact-us':
                    return self.domain + 'contactservice.php?action=contactUs';
                    break;

                case 'f-b':
                    return self.domain + 'fandbkit.php';
                    break;

                case 'directory-category-list':
                    return self.domain + 'directorylist.php';
                    break;

                case 'directory-sub-category-list':
                    //subdirectorylistbyid.php?subid=2
                    return self.domain + 'subdirectorylistbyid.php';
                    break;

                case 'directory-sub-category-list-item':
                    //http://rasmentorshipforum.com/webservice/listing_subdirectory_details_by_id.php?listing_id=7
                    return self.domain + 'listing_subdirectory_details_by_id.php';
                    break;

                case 'forum-category':
                    return self.domain + 'forum_category_list.php';
                    break;

                case 'forum-subcat':
                    return self.domain + 'forum_sub_category_list.php';
                    break;

                case 'forum-topic-list':
                    return self.domain + 'forum_category_lict_byId.php?action=forumcategorylistByid';
                    break;

                case 'forum-topic-create':
                    return self.domain + 'forum_category_create_topic.php';
                    break;

                case 'forum-topic-items':
                    return self.domain + 'forum_subcategory_list_byId.php?action=forumsubcategorylistByid';
                    break;

                case 'forum-topic-reply':
                    return self.domain + 'forum_category_reply_topic.php';
                    break;

                case 'search-category':
                    return self.domain + 'search_cat.php?action=search_category';
                    break;

                case 'search-list':
                    return self.domain + 'search_cat.php?action=textsearch';
                    break;

                case 'search-item':
                    return self.domain + 'search_cat.php?action=search_result';
                    break;

                case 'user-image':
                    return self.domain + 'image_by_userid.php';
                    break;

                case 'upload':
                    return self.domain + 'upload.php';
                    break;

                case 'push-step-one':
                    return self.domain + 'pushmessage.php?action=save_device_token';
                    break;

                case 'default':
                    return 'no such parameter defined';
                    break;

            }
        }

        return {
            getUrl: getUrl //Get url for respective incomming services
        };
    };

})();
