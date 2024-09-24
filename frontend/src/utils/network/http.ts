import Axios, { CancelTokenSource, AxiosStatic, AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../config';
import { deleteStorage, getStorage } from '../localstorage';

export interface AxiosRequestConfigWithExtra extends AxiosRequestConfig {
    extra?: {
        retriesLeft: number;
        isRetrying: boolean;
    };
}

export interface IHttpInstance {
    source: CancelTokenSource;
    http: AxiosInstance;
    externalHttp: AxiosStatic;
    cancel: () => void;
}

export const BASIC_CONFIG = {
    baseURL: '',
    url: '',
};

class HttpService implements IHttpInstance {
    private endPoint: string;
    private host: string;

    source: CancelTokenSource;
    http: AxiosInstance;
    externalHttp: AxiosStatic;

    constructor(endPoint: string, host?: string) {
        this.endPoint = endPoint;
        this.host = host ?? config.apiUrl;
        const { source, http } = this.initAxios();
        this.source = source;
        this.http = http;
        this.externalHttp = Axios;
        
        // Add the interceptor
        this.setupInterceptors();
    }

    private initAxios() {
        const source: CancelTokenSource = Axios.CancelToken.source();
        const baseURL = `${this.host}/${this.endPoint}`;
        const http = Axios.create({
            baseURL,
            cancelToken: source.token,
            // Initial headers can be empty or set here
            headers: {
                "content-type": "application/json",
            }
        });

        // Add a request interceptor to set headers for each request
        http.interceptors.request.use(config => {
            config.headers.Authorization = getStorage("IdToken") || '';
            return config;
        });

        return { source, http };
    }

    private setupInterceptors() {
        this.http.interceptors.response.use(
            response => {
                // If the response is successful, just return it
                return response;
            },
            error => {
                // If there is an error, check the response status
                if (error.response) {
                    const status = error.response.status;
                    if (status === 401 || status === 403) {
                        // Redirect to /login when status is 401 or 403
                        deleteStorage("IdToken");
                        deleteStorage("RefreshToken");
                        deleteStorage("AccessToken");

                        window.location.href = '/login';
                    }
                }
                // Reject the error if it's not 401 or 403
                return Promise.reject(error);
            }
        );
    }

    cancel(): void {
        if (this.source !== undefined) {
            this.source.cancel(`${this.endPoint} operation canceled by the user`);
            const { source, http } = this.initAxios();
            this.source = source;
            this.http = http;
        }
    }
}

export default HttpService;
