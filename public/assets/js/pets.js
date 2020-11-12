$('#registerForm').on('submit', (event)=>{
    event.preventDefault();
    let registerObj = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        agreeToTerms: $('#agreeToTerms').val()
    };

    if(registerObj.password === $('#confirmPassword').val()){
        $.post('/api/user/register', registerObj).then(function(response){
            if(response === 200){
                //alert('good');
            }
        });
    }else{
        //alert user of mismatching passwords, not meeting required security
    }
});