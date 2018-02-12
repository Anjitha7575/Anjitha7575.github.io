(function () {
    angular
            .module('validation.rule', ['validation'])
            .config(['$validationProvider', function ($validationProvider) {
                    var expression = {
                        required: function (value) {
                            return !!value;
                        },
                        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                        email: /^[A-Za-z0-9_+%-]{1,64}(\.[A-Za-z0-9_+%-]{1,64}){0,4}@[A-Za-z0-9-]{1,64}(\.[A-Za-z0-9]{1,64}){0,4}\.[a-zA-Z]{2,8}$/,
                        password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$%!]).{8,20}$/,
                        number: /^\d+$/,
                        float: /^[+]?([.]\d+|\d+([.]\d+)?)$/,
                        integer: /^[+-]?\d*$/,
                        phone: /^\+(?:[0-9] ?){10,14}[0-9]$/,
                        alphaspace: /^[a-z ]*$/i,
                        alphanumeric: /^[a-zA-Z0-9 ]*$/i,
                        address: /^[a-zA-Z0-9 ,/.#'"-]*$/i,
                        validname: /^[a-zA-Z0-9_-]*$/,
                        validname2: /^[a-zA-Z0-9 _-]*$/,
                        bandwidth: /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
                        bandwidthpercent: /^[0-9][0-9]?$|^100$/,
                        minlength: function (value, scope, element, attrs, param) {
                            return value.length >= param;
                        },
                        maxlength: function (value, scope, element, attrs, param) {
                            return value.length <= param;
                        },
                        multiselectsinglerequired: function (value, scope, element, attrs, param) {
                            if (value.id)
                                return true;
                            return false;
                        },
                        multiselectmultiplerequired: function (value, scope, element, attrs, param) {
                            if (value.length > 0)
                                return true;
                            return false;
                        },
                        numbermaxlength: function (value, scope, element, attrs, param) {
                            if (value)
                                return value.toString().length <= param;
                            else
                                return true;
                        },
                        confirmpassword: function (value, scope, element, attrs, param) {
                            return value == attrs.validateEqual;
                        },
                        numberboxminvalue: function (value, scope, element, attrs, param) {
                            var signedValue = value.trim();
                            if (signedValue != "-" && signedValue.indexOf("-") == 0) {
                                return Number(signedValue) >= Number("-" + param);
                            } else {
                                return true;
                            }
                        },
                        greaterThanStartTime: function (value, scope, element, attrs, param) {
                            var startTime = new Date(attrs.validateEqual);
                            return value > startTime;
                        },
                        bidvalidation: function (value, scope, element, attrs, param) {
                            if (value) {
                                if (value > 20) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        },
                        latlong: function (value, scope, element, attrs, param) {
                            if (value) {
                                if (value > 0 || value < 0) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }
                        },
                        numberboxmaxvalue: function (value, scope, element, attrs, param) {
                            var signedValue = value.trim();
                            if (signedValue != "+" && signedValue.indexOf("-") != 0) {
                                return Number(signedValue) <= Number(param);
                            } else {
                                return true;
                            }
                        },
                        selectrequired: function (value, scope, element, attrs, param) {
                            if (value[param] && value[param] != "-1")
                                return true;
                            else
                                return false;
                        },
                        inventoryendtimevalid:function(value, scope, element, attrs, param){
                            if (scope.inviteBidObject.slotStartTime >= scope.inviteBidObject.slotEndTime) {
                                if(scope.inviteBidObject.endDate > scope.inviteBidObject.startDate){
                                    return true
                                }else{
                                    return false;
                                }
                            }else{
                                return true;
                            }
                        },
                        campaignendtimevalid:function(value, scope, element, attrs, param){
                            if (scope.addCampaignObject.startTime >= scope.addCampaignObject.endTime) {
                                if(scope.addCampaignObject.endDate > scope.addCampaignObject.startDate){
                                    return true
                                }else{
                                    return false;
                                }
                            }else{
                                return true;
                            }
                        },
                        nonnegative: function(value, scope, element, attrs, param){
                            if(value > 0){
                                return true;
                            } else{
                                return false;
                            }
                        },
                        beacon: function(value, scope, element, attrs, param){
                            if(scope.adv.isCampaignExtEnable){
                                return !!value;
                            }else{
                                return true;
                            }
                        },
                        targetaddress: function(value, scope, element, attrs, param){
                            if(scope.isTargetSelected == 2){
                                var address = $("#locationAddName").val();
                                return address.length > 0;
                            }else{
                                return true;
                            }
                        },
                        maxcategories: function(value, scope, element, attrs, param){
                            if (scope.locationCategories.length <= 3) {
                                return true;
                            }
                            else return false;
                        },
                    };

                    var defaultMsg = {
                        required: {
                            error: 'This field is required'
                        },
                        url: {
                            error: 'Invalid URL'
                        },
                        email: {
                            error: 'Invalid email address'
                        },
                        password: {
                            error: 'Must contain 8-20 Chars, 1 lowercase, upper case, number each and 1 special char(@,#,$,%,!)'
                        },
                        number: {
                            error: 'Enter numeric integers only'
                        },
                        float: {
                            error: 'Enter numeric values only'
                        },
                        integer: {
                            error: 'Please provide integers only'
                        },
                        phone: {
                            error: 'Invalid format. Ex: +XX XXXXX XXXXX'
                        },
                        alphaspace: {
                            error: 'Only alphabet, space allowed'
                        },
                        alphanumeric: {
                            error: 'Only alphabets, numbers allowed'
                        },
                        bandwidth: {
                            error: 'BW should be a number(between 0-65535)'
                        },
                        bandwidthpercent: {
                            error: 'BW Percent should be between 1-100'
                        },
                        minlength: {
                            error: 'This should be longer'
                        },
                        maxlength: {
                            error: 'This should be shorter'
                        },
                        multiselectsinglerequired: {
                            error: 'This field is required'
                        },
                        multiselectmultiplerequired: {
                            error: 'This field is required'
                        },
                        numbermaxlength: {
                            error: 'This should be smaller'
                        },
                        confirmpassword: {
                            error: 'Password do not match'
                        },
                        numberboxminvalue: {
                            error: 'You cannot reduce value more than this'
                        },
                        bidvalidation: {
                            error: 'Bid price should be greater than zero'
                        },
                        validname: {
                            error: 'Must not contain special characters other than "_" and "-"'
                        },
                        validname2: {
                            error: 'Must not contain special characters other than "_" and "-"'
                        },
                        multiselectrequired: {
                            error: 'This field is required'
                        },
                        numberboxmaxvalue: {
                            error: 'You cannot add value more than this'
                        },
                        address: {
                            error: 'Invalid address , allowed special characters (,\'\".#- )'
                        },
                        selectrequired: {
                            error: 'This field is required'
                        },
                        latlong: {
                            error: 'Please select coordinates from map'
                        },
                        inventoryendtimevalid:{
                            error:'End time should be greater than start time'
                        },
                        campaignendtimevalid:{
                            error:'End time should be greater than start time'
                        },
                        nonnegative: {
                            error: 'Please enter a value greater than zero.'
                        },
                        beacon:{
                            error: 'Please enter a value'
                        },
                        targetaddress: {
                            error: 'Target Address is required'
                        },
                        maxcategories: {
                            error: 'Only three categories can be targeted at a time'
                        },
                    };
                    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
                }]);
}).call(this);
