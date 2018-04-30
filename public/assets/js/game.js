<<<<<<< HEAD
$(document).ready(function () {
  $('.ui.rating').rating({
    initialRating: 3,
    maxRating: 5
  });
  $('.ui.dropdown').dropdown();
  $('.ui.form').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [{
            type: 'empty',
            prompt: 'Please enter your e-mail'
          },
          {
            type: 'email',
            prompt: 'Please enter a valid e-mail'
          }
        ]  
      },
      password: {
        identifier: 'password',
        rules: [{
            type: 'empty',
            prompt: 'Please enter your password'
          },
          {
            type: 'length[6]',
            prompt: 'Your password must be at least 6 characters'
          }
        ]
      }
    }
  });
});
=======
>>>>>>> 59f0c33fdcfba28d480864a59660d4154da27111
