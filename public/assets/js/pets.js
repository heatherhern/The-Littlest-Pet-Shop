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
                window.location.replace('/register/' + response.error);
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
            window.location.replace('/login/' + response.error);
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


$('.search-card').click(function (event) {
    event.preventDefault();
    if (event.target.className.includes("savepetBtn")) {
        if ($(this).find('.savepetBtn')[0].dataset.id) {
            let userId = $(this).find('.savepetBtn')[0].dataset.id;
            let uuid = '#' + $(this).find('.savepetBtn')[0].dataset.uuid;
            let petObj = {
                name: $(uuid).children()[1].children[0].innerText,
                species: $(uuid).children()[1].children[1].children[0].innerText,
                age: $(uuid).children()[1].children[1].children[1].innerText,
                gender: $(uuid).children()[1].children[1].children[2].innerText,
                email: $(uuid).children()[1].children[5].children[0].children[0].children[0].innerText,
                phone: $(uuid).children()[1].children[5].children[0].children[0].children[1].innerText,
                address1: $(uuid).children()[1].children[5].children[0].children[0].children[2].innerText,
                address2: $(uuid).children()[1].children[5].children[0].children[0].children[3].innerText,
                city: $(uuid).children()[1].children[5].children[0].children[0].children[4].innerText,
                state: $(uuid).children()[1].children[5].children[0].children[0].children[5].innerText,
                zip: $(uuid).children()[1].children[5].children[0].children[0].children[6].innerText,
                country: $(uuid).children()[1].children[5].children[0].children[0].children[7].innerText,
                photo_url: $(uuid).children()[0].currentSrc,
                url: $(uuid).children()[1].children[2].href,
            };
            console.log(petObj);
            $.post('/api/save-pet/' + userId, petObj).then(function (response) {
                response = JSON.parse(response);
                if (response.code === 200) {
                    console.log("Save Successfull");
                }
            })

        } else {
            window.location.replace('/login');
        }
    }

});

$('.saved-card').click(function (event) {
    event.preventDefault();
    if (event.target.className.includes("deletepetBtn")) {
        let petId = $(this).find('.deletepetBtn')[0].dataset.id;
        $.ajax({
            url: '/api/delete-pet/'+petId,
            type: 'DELETE'
        }).then(function(response){
            console.log(response);
            location.reload();
        });
    }
});