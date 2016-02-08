(function () {
    'use strict';

    angular.module('common.services').factory('GlobalVariables', [GlobalVariables]);

    function GlobalVariables() {

        self.firstConfirmationCallPeriod        = 500;        // also used for first splash screen
        self.loaderDefaultTime                  = 1000;
        self.listRefreshTime                    = 2000;
        self.hardListRefreshTime                = 5000;
        self.stateChangeLoaderTime              = 100;
        self.parseHtmlTimer                     =   1000;
        self.parseHtmlATimer                    =   2000;

        /*      global messages        */
        self.globalNetworkContentMessage        = "You have no network connection. Please connect to Wifi or turn on Data Roaming";
        self.globalNetworkOfflineMessage        = "You have no network connection. Please connect to Wifi or turn on Data Roaming";
        self.globalErrorMessage                 = "You have no network connection. Please connect to Wifi or turn on Data Roaming";
//        self.globalErrorHeading         = "Restaurant Association of Singapore";
        self.globalErrorHeading                 = "RAS Mentorship";
        self.globalErrorButtonTitle             = "Ok";

        self.globalSuccessMessage               = "Success Operation";
        self.globalSuccessHeading               = "RAS Mentorship";
        self.globalSuccessButtonTitle           = "Ok";


        /*      form validation messages        */
        self.globalFormErrorMessage             = "Oops! Something went wrong. Please try again.";
        self.globalFormErrorHeading             = "RAS Mentorship";
        self.globalFormErrorButtonTitle         = "Ok";

        /*      login form message              */
        self.commonLoginFormMessage             = "Wrong user details";

        /*      registration messages         */
        self.globalEmailValidationError         = "Please enter a valid email address.";
        self.globalEmptyFormError               = "Please fill out this field.";
        self.globalPasswordTooShort             = "Password is too short. Passwords must have at least 4 characters.";
        self.accountCreateSuccess               = "Your account has been created and an activation link has been sent to the email address you entered. Note that you must activate the account by clicking on the activation link when you get the email before you can login.";
        self.emailAlreadyInUse                  = "The email address you entered is already in use or invalid. Please enter another email address.";
        self.usernameNotAvailable               = "The username you entered is not available. Please pick another username.";
        self.incorrectUserDetails               = "Please enter correct username and password.";
        self.noUserForEmail                     = "Please enter the email address associated with your user account.";
        self.resetPasswordFail                  = "Reset password failed: Invalid email address";
        self.userNotActivated                   = "Login denied! Your account has either been blocked or you have not activated it yet.";
        self.globalCaptchaError                 = "You have entered wrong captcha. Please try again.";

        return {
            firstConfirmationCallPeriod : firstConfirmationCallPeriod,  // time for first check on ui or services
            parseHtmlTimer              : parseHtmlTimer,
            parseHtmlATimer             : parseHtmlATimer,
            globalNetworkContentMessage : globalNetworkContentMessage,
            globalNetworkOfflineMessage : globalNetworkOfflineMessage,  // return default globalNetworkOfflineMessage
            globalFormErrorMessage      : globalFormErrorMessage,       // return default Form Error Message for dialog
            globalFormErrorHeading      : globalFormErrorHeading,       // return default Form Error Heading for dialog
            globalFormErrorButtonTitle  : globalFormErrorButtonTitle,   // return default Form Error Button Title for dialog
            globalSuccessMessage        : globalSuccessMessage,         // return default Success Button Message for dialog
            globalSuccessHeading        : globalSuccessHeading,         // return default Success Button Heading for dialog
            globalSuccessButtonTitle    : globalSuccessButtonTitle,     // return default Success Button Title for dialog
            globalErrorButtonTitle      : globalErrorButtonTitle,       // return default Error Button Title for dialog
            commonLoginFormMessage      : commonLoginFormMessage,
            globalErrorHeading          : globalErrorHeading,           // return default Error Heading for dialog
            globalErrorMessage          : globalErrorMessage,           // return default Error message for dialog
            loaderDefaultTime           : loaderDefaultTime,            // return default time value in number for loader
            listRefreshTime             : listRefreshTime,              // time between exact first and second call of list paging content
            hardListRefreshTime         : hardListRefreshTime,
            stateChangeLoaderTime       : stateChangeLoaderTime,         // time between all states for loading symbor
            globalEmailValidationError  : globalEmailValidationError,
            globalEmptyFormError        : globalEmptyFormError,
            globalPasswordTooShort      : globalPasswordTooShort,
            accountCreateSuccess        : accountCreateSuccess,
            emailAlreadyInUse           : emailAlreadyInUse,
            usernameNotAvailable        : usernameNotAvailable,
            incorrectUserDetails        : incorrectUserDetails,
            noUserForEmail              : noUserForEmail,
            resetPasswordFail           : resetPasswordFail,
            userNotActivated            : userNotActivated,
            globalCaptchaError          : globalCaptchaError
        };
    }
    ;
})();
