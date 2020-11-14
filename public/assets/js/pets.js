$('#registerForm').on('submit', (event) => {
    event.preventDefault();
    let registerObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        agreeToTerms: $('#agreeToTerms').val()
    };

    if (registerObj.password === $('#confirmPassword').val()) {
        $.post('/api/user/register', registerObj).then(function (response) {
            console.log(response);
            window.location.replace('/login')
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

    $.post('/api/user/login', loginObj).then(function (response) {
        console.log(response);
        window.location.replace("/search-pet")
    });
});

$('#forgotPasswordForm').on('submit', (event) => {
    event.preventDefault();

    $.post('/api/user/forgot-password', {email: $('#email').val()}).then(function (response) {
        console.log(response.id);
        window.location.replace('/user/'+response.id+'/reset-password')
    });
});

$('#resetPasswordForm').on('submit', (event) => {
    event.preventDefault();
    let id = $('#save-btn').data("id");
    if($('#password').val() === $('#confirmPassword').val()){
        $.post('/api/user/'+id+'/reset-password', {password: $('#password').val()}).then(function(response){
            console.log(response);
            window.location.replace('/login')
        });
    }else{
        alert("Your Passwords Must Match");
    }
});

$('.savepetBtn').on('click', (event)=>{
    event.preventDefault();
    if($('.savepetBtn').data('id')){
        console.log($('.savepetBtn').data('id'));




    }else{
        alert("you gotta be logged in willis")
        window.location.replace('/login');
    }
})