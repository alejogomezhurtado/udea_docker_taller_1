
jQuery(document).ready(function() {

    $('.page-container form').submit(function(){
        var username = $(this).find('.username').val();
        var password = $(this).find('.password').val();
        if(username == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password == '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
			
				var credentials = {user: username, password: password}
				$.ajax({
						url: "backend:8090/login",
						dataType: 'text',
						type: 'post',
						contentType: 'application/x-www-form-urlencoded',
						data: credentials,//$().serialize(),
						success: function( data, textStatus, jQxhr ){
								$('#response pre').html( data );
						},
						error: function( jqXhr, textStatus, errorThrown ){
								console.log( errorThrown );
						}
				});
				return false;
    });

    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });

});
