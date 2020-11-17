$('#registerForm').on('submit', (event) => {
    event.preventDefault();
    let registerObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    if (registerObj.password === $('#confirmPassword').val()) {
        $.post('/user/register', registerObj).then(function (response) {
            response = JSON.parse(response);
            if (response.code === 200) {
                console.log("all good, redirecting")
                //redirect
                window.location.replace('/saved-pets')
            } else if (response.code === 500) {
                console.log(response.error);
                //handle error
                window.location.replace('/register/'+response.error);
            }
        });
    } else {
        //alert user of mismatching passwords, not meeting required security
    }
});

$('#loginForm').on('submit', (event) => {
    event.preventDefault();
    let loginObj = {
        email: $('#email').val(),
        password: $('#password').val(),
    };

    $.post('/user/login', loginObj).then(function (response) {
        response = JSON.parse(response);
        if (response.code === 200) {
            console.log("Login Successfull, Redirect");
            //redirect
            window.location.replace('/saved-pets');
        } else if (response.code === 500) {
            console.log(response.error);
            //handle error
            window.location.replace('/login/'+response.error);
        }
    });
});

$('#forgotPasswordForm').on('submit', (event) => {
    event.preventDefault();

    $.post('/user/forgot-password', { email: $('#email').val() }).then(function (response) {
        console.log(response.id);
        window.location.replace('/user/' + response.id + '/reset-password')
    });
});

$('#resetPasswordForm').on('submit', (event) => {
    event.preventDefault();
    let id = $('#save-btn').data("id");
    if ($('#password').val() === $('#confirmPassword').val()) {
        $.post('/user/' + id + '/reset-password', { password: $('#password').val() }).then(function (response) {
            window.location.replace('/login')
        });
    } else {
        alert("Your Passwords Must Match");
    }
});

$('.savepetBtn').on('click', (event) => {
    event.preventDefault();
    if ($('.savepetBtn').data('id')) {
        let uuid = '#' + $('.savepetBtn').data('uuid');
        let card = $(uuid).children();
        console.log(card);




    } else {
        window.location.replace('/login');
    }
})