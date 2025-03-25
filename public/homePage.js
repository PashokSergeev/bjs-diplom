//Выход из личного кабинета
let logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success === true) {
        location.reload();
    }
})

//Получение информации о пользователе
ApiConnector.current(response => {
    ProfileWidget.showProfile(response.data)
})

//Получение текущих курсов валюты
let rb = new RatesBoard();

function getStocks() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            rb.clearTable();
            rb.fillTable(response.data);
        }
    })
}

getStocks();
setInterval(() => getStocks(), 60000);

//Операции с деньгами
let mm = new MoneyManager();

////пополнение баланса
mm.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data)
            mm.setMessage(response.success, "Пополнение успешно!")
        } else {
            mm.setMessage(response.success, response.error)
        }
    })
}

////конвертирование валюты
mm.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data)
            mm.setMessage(response.success, "Конвертация успешно!")
        } else {
            mm.setMessage(response.success, response.error)
        }
    })
}

////перевод валюты
mm.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data)
            mm.setMessage(response.success, "Перевод успешен успешно!")
        } else {
            mm.setMessage(response.success, response.error)
        }
    })
}

//Работа с избранным
let fw = new FavoritesWidget();

////Запросите начальный список избранного
ApiConnector.getFavorites(response => {
    if (response.success === true) {
        fw.clearTable();
        fw.fillTable(response.data);
        mm.updateUsersList(response.data);

    }
})

////Реализуйте добавления пользователя в список избранных
fw.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        console.log(response);
        console.log(data);
        if (response.success === true) {
            fw.clearTable();
            fw.fillTable(response.data);
            mm.updateUsersList(response.data);
            fw.setMessage(response.success, 'Пользователь успешно добавлен')
        }else{
            fw.setMessage(response.success, response.error)
        }
    })
}

////Реализуйте удаление пользователя из избранного
fw.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            fw.clearTable();
            fw.fillTable(response.data);
            mm.updateUsersList(response.data);
            fw.setMessage(response.success, 'Пользователь успешно удален')
        }else{
            fw.setMessage(response.success, response.error)
        }
    })
}







