// Core scripts

$(document).ready(function() {

	/**
	---------------------------------------------------------------
	 * START: Header Navigation
	---------------------------------------------------------------
	**/

	// Navigation
	$('ul.main-nav').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 750
	});

	// Mobile Nav Icon
	$('header nav .mobile-nav-icon span').click(function() {
		$('ul.main-nav').toggleClass('show');
	});

	// Close mobile nav after link is clicked and if user clicks in main or footer area
	$('ul.main-nav li a, main, footer').click(function() {
		if($(window).width() <= 900) {
			$('ul.main-nav').removeClass('show');
		}
	})

	// Header - MB link
	$('header .logo').click(function() {
		$('html, body').animate({
			scrollTop: $('main').offset().top
		}, 750);
	});

	/**
	---------------------------------------------------------------
	 * END: Header Navigation
	---------------------------------------------------------------
	**/

	// Home banner - About link
	$('#home a.btn').click(function() {
		var offsetHeight;
		if($(window).width() > 400) {
			offsetHeight = 75;
		} else {
			offsetHeight = 60;
		}
		$('html, body').animate({
			scrollTop: $('#skills').offset().top - offsetHeight
		}, 750);
	});

	// execute after the entire page has loaded
	$(window).bind('load', function() {
		if(!$('#bad-ie').length > 0) {
			$('body').removeClass('loading');
			$('#main-overlay').remove();
		}
	});

	/**
	---------------------------------------------------------------
	 * START: Contact Form
	---------------------------------------------------------------
	**/

	$('#contact .form-wrapper button#contact-submit').click(function() {

		var validationError;
		var contactMessage = $('#contact .form-wrapper p.contact-message');
		var contactButton = $('#contact .form-wrapper button#contact-submit');

		$('#contact .form-wrapper input[type="text"], #contact .form-wrapper textarea').each(function() {
			if($(this).val().length < 1) {
				$(this).addClass('error');
				validationError = true;
			} else {
				$(this).removeClass('error');
			}
		});

		if(validationError != true) {

			var contactNameVal = $('#contact .form-wrapper input#contact-name').val();
			var contactEmailVal = $('#contact .form-wrapper input#contact-email').val();
			var contactMessageVal = $('#contact .form-wrapper textarea#contact-message').val();
			var dataToSend = '&name=' + contactNameVal + '&email=' + contactEmailVal + '&message=' + contactMessageVal;

			$.ajax({
				type: 'POST',
				url: 'includes/contactFormProcess.php',
				data: dataToSend,
				success: function() {

					contactMessage.removeClass('error').addClass('success').html(contactMessage.data('success-msg'));

					var originalButtonText = contactButton.text();
					contactButton.text($(contactButton).data('success-msg')).attr('disabled', true);

					setTimeout(function(){ 
						
						$('#contact .form-wrapper input[type="text"], #contact .form-wrapper textarea').val('');
						contactMessage.removeClass('success');
						contactButton.text(originalButtonText).removeAttr('disabled');

					}, 7000);
				}
			});

		} else {

			contactMessage.removeClass('success').addClass('error').html(contactMessage.data('error-msg'));

		}
		
		return false;

	});

	/**
	---------------------------------------------------------------
	 * END: Contact Form
	---------------------------------------------------------------
	**/

});