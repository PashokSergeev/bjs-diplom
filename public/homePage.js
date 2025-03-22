'use strict';

let logoutButton = new LogoutButton();

logoutButton.action(() => ApiConnector.logout(response => {
    if (response.success === true) {
        location.reload();
    }
}))

