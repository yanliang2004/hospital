var $btnUser = $('#btn-user'),
	$userMenu = $('#user-menu'),
	$aUserInfo = $('#a-user-info'),
	$aChangePw = $('#a-change-pw'),
	$aLogout = $('#a-logout');

function enableDropDown() {
	
	$btnUser.click(function (e) {
		
		e.preventDefault();
		
		$userMenu.slideToggle(200);
		
	});
}

function enableLogout() {
	$aLogout.click(function (e) {
		e.preventDefault();
		
		$.post('logout.php');
		
		window.location = 'login.html';
	});
}

function init() {
	
	enableDropDown();
	
	enableLogout();
	
}


init();
