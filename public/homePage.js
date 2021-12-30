

//Выход из личного кабинета
const logoutBtn = new LogoutButton()
logoutBtn.action = () => logout()

function logout() {
    ApiConnector.logout(response => {
        if(response.success === true) {
            location.reload();
        }
    })
}


//Получение информации о пользователе

ApiConnector.current(response => {
    if(response.success === true) {
        ProfileWidget.showProfile(response.data)
    }
})


//Получение текущих курсов валюты
function getStocks() {
    ratesBoard = new RatesBoard()
    ApiConnector.getStocks(response => {
        if(response.success === true) {
            ratesBoard.clearTable()
            ratesBoard.fillTable(response.data) 
        }
    })
}


getStocks()

setInterval(getStocks, 60000)


//Операции с деньгами

moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = data => addMoney(data)
moneyManager.conversionMoneyCallback = data => convertMoney(data)
moneyManager.sendMoneyCallback = data => transferMoney(data)

function addMoney(data) {
    ApiConnector.addMoney(data, response => {

        if(response.success === true) {
            moneyManager.setMessage(true, "сумма внесена")
            ProfileWidget.showProfile(response.data)
            
        } else {
            moneyManager.setMessage(false, "сумма не внесена")
        }
    })
}

function convertMoney(data) {
    ApiConnector.convertMoney(data, response => {
        
        if(response.success === true) {
            moneyManager.setMessage(true, "сумма конвертирована")
            ProfileWidget.showProfile(response.data)
            
        } else {
            moneyManager.setMessage(false, "сумма не конвертирована")
        }
    })
}

function transferMoney(data) {
    ApiConnector.transferMoney(data, response => {

        if(response.success === true) {
            moneyManager.setMessage(true, "сумма переведена")   
            ProfileWidget.showProfile(response.data)        
        } else {
            moneyManager.setMessage(false, response.error)
        }
    })
}




//Работа с избранным

favoritesWidget = new FavoritesWidget()

favoritesWidget.addUserCallback = data => addUserToFavorites(data)
favoritesWidget.removeUserCallback = data => removeUserFromFavorites(data)

ApiConnector.getFavorites(response => {
    if(response.success === true) {
        favoritesWidget.clearTable()
        favoritesWidget.fillTable(response.data)
        moneyManager.updateUsersList(response.data)
    }
})

function addUserToFavorites(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success === true) {
            
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(true, "пользователь добавлен в избранное")
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
    })
}

function removeUserFromFavorites(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success === true) {
            
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(response.data)
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(true, "пользователь удален из избранных")
        } else {
            favoritesWidget.setMessage(false, response.error)
        }
    })
}

