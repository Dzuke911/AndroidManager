$(function () {
    jQuery.validator.addMethod('passwordvalidateminlength',
        function (value, element) {
            var ret = (value.length >= 8);
            errorClassAdder(element, ret);
            return ret;
        });
    jQuery.validator.addMethod('passwordvalidatemaxlength',
        function (value, element) {
            var ret = (value.length <= 16);
            errorClassAdder(element, ret);
            return ret;
        });
    jQuery.validator.addMethod('passwordallowedcharacters',
        function (value, element) {
            var ret = /^[a-zA-Z0-9]+$/.test(value);
            errorClassAdder(element, ret);
            return ret;
        });
    jQuery.validator.addMethod('passwordcontainslowercase',
        function (value, element) {
            var ret = /^.*[a-z].*$/.test(value);
            errorClassAdder(element, ret);
            return ret;
        });

    jQuery.validator.addMethod('passwordcontainsuppercase',
        function (value, element) {
            var ret = /^.*[A-Z].*$/.test(value);
            errorClassAdder(element, ret);
            return ret;
        });

    jQuery.validator.addMethod('passwordcontainsnumeric',
        function (value, element) {
            var ret = /^.*[0-9].*$/.test(value);
            errorClassAdder(element, ret);
            return ret;
        });

    jQuery.validator.unobtrusive.adapters.addBool('passwordvalidateminlength');
    jQuery.validator.unobtrusive.adapters.addBool('passwordvalidatemaxlength');
    jQuery.validator.unobtrusive.adapters.addBool('passwordallowedcharacters');
    jQuery.validator.unobtrusive.adapters.addBool('passwordcontainslowercase');
    jQuery.validator.unobtrusive.adapters.addBool('passwordcontainsuppercase');
    jQuery.validator.unobtrusive.adapters.addBool('passwordcontainsnumeric');

}(jQuery));

function errorClassAdder(element, bool) {
    if (bool == true) {
        $(element).parent().removeClass("has-error");
    }
    else {
        $(element).parent().addClass("has-error");
    }
}