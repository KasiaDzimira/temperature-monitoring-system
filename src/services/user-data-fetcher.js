var users = [];

class UserDataFetcher {
    fetch(objects) {
        return this.transform(objects);
    }

    supports(object) {
        return ('users' === object);
    }

    findByUsername(email) {
        return users.find(user => {
            return user.email === email
        });
    }

    transform(objects) {
        objects.forEach(function (object) {
            let item = [];
            let values = object.val();

            item.email = values.email;
            item.password = values.password;
            item.roleUser = values.role;

            users.push(values);
        });

        return users;
    }
}

module.exports = UserDataFetcher;