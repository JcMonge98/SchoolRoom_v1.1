import axios from 'axios';

//const API_URL = 'http://localhost:8080/api/auth/';
//const API_URL = 'http://localhost:8080/auth/';
const API_URL = 'https://app-schoolroom.herokuapp.com/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    //localStorage.setItem('profile', JSON.stringify(response.data));
                    /*localStorage.setItem("utils", {
                        "token": Json.stringify(response.data.accesstoken),
                        "Role": Json.stringify(response.data.roles)
                    });*/


                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            nombres: user.nombres,
            apellidos: user.apellidos,
            email: user.email,
            password: user.password
                // roles: [user.roles]
        });
    }
}

export default new AuthService();