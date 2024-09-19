import HttpService, { IHttpInstance } from '../utils/network/http';

class AuthenticationService {
    APIv1: IHttpInstance;

    constructor() {
        this.APIv1 = new HttpService('');
    }

    async createUser(data: {
        username: string,   
        email: string,
        password: string}) {
            const affiliate = await this.APIv1.http.post('register', JSON.stringify(data), {
                headers: {
                    'content-type': 'application/json',
                },
            });
    
            return affiliate.data;
        }

    async login(data: {
        username: string,
        password: string
    }) {
        const response = await this.APIv1.http.post('login', JSON.stringify(data), {
            headers: {
                'content-type': 'application/json',
            },
        });

        return response.data;
    }

   
}

export default new AuthenticationService();
