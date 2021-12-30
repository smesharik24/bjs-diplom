"use strict";
const userForm = new UserForm();

// вход  личный кабинет
userFrom.loginFormCallback = data => login(data)

function login(data){
    ApiConnector.login(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            userFrom.setLoginErrorMessage(response.error) 
        }
    } )
}

// регистрация нового пользователя
userFrom.registerFormCallback = data => register(data)

function register(data){
    ApiConnector.register(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            userFrom.setRegisterErrorMessage(response.error)
        }
    })
}