
var $w = $(window);

var $mainPanel = $('#main-panel'),
    $detailPanel = $('#detail-panel');

var $list = $('#list'),
    $aToggleAll = $list.find('#a-toggle-all'),
    $listBody = $list.find('#list-body'),
    $deptTmpl = $list.find('#dept-tmpl'),
    $userTmpl = $deptTmpl.find('#user-tmpl');

var $detail = $('#detail'),
    $frmUser = $detail.find('#frm-user');

export {
    $w,
    
    $mainPanel,
    $detailPanel,
    
    $list,
    $aToggleAll,
    $listBody,
    $deptTmpl,
    $userTmpl,
    
    $detail,
    $frmUser
};
