class UserDataFetcher {
    fetch(objects) {
        this.users = this.transform(objects);

        return this.users;
    }

    supports(object) {
        return ('users' === object);
    }

    findByUsername(username) {
        return this.users.find(user => {
            return user.login === username
        });
    }

    transform(objects) {
        let data = [];

        objects.forEach(function (object) {
            let item = {};

            item.id = object.key;
            item.login = object.val().login;
            item.password = object.val().password;

            data.push(item);
        });

        return data;
    }
}

module.exports = UserDataFetcher;