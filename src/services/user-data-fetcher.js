class UserDataFetcher {
    constructor() {
        this.users = [];
    }

    fetch(objects) {
        return this.transform(objects);
    }

    supports(object) {
        return ('users' === object);
    }

    findByUsername(objects, user) {
        objects.forEach(function (object) {
            if (object.val().email === user) {
                window.localStorage.setItem('userFound', true);
            }
        });
    }

    transform(objects) {
        var data = [];

        objects.forEach(function (object) {
            let item = [];
            let values = object.val();

            item.email = values.email;
            item.password = values.password;
            item.roleUser = values.role;

            data.push(values);
        });

        return data;
    }
}

module.exports = UserDataFetcher;