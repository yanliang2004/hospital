!function(){"use strict";var e=$("#frm-login"),r=$("#form-msg"),n=$("#uname"),o=$("#pw"),a=$("#btn-login"),s={init:function(){this.deferred=$.Deferred(),this.enable(),r.removeClass("error")},enable:function(){n.prop("disabled",!1),o.prop("disabled",!1),a.prop("disabled",!1)},disable:function(){n.prop("disabled",!0),o.prop("disabled",!0),a.prop("disabled",!0)},showErrors:function(e){i.showErrors(e)}},i=e.validate({success:"valid",submitHandler:function(){s.disable(),s.deferred.resolve({uname:n.val(),pw:o.val()})}}),d={init:function(){var r=this.deferred=$.Deferred();$.getJSON("getNonce.php",function(e){r.resolve(e)})}};function t(){s.init(),d.init(),$.when(s.deferred,d.deferred).done(l)}function l(e,r){var n=function(e,r){var n=md5(e.uname+":"+e.pw);return md5(n+":"+r)}(e,r);$.post("login.php",{uname:e.uname,loginHash:n},c,"json")}function c(e){switch(console.log(e),e.code){case 0:location="user-list.html";break;case 1:s.showErrors(e.data);break;case 2:s.showErrors({uname:e.data});break;case 3:s.showErrors({pw:e.data});break;case 5:s.showErrors({uname:e.data})}t()}t()}();
