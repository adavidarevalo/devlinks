import Axios, { CancelTokenSource, AxiosStatic, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config';
import { deleteStorage, getStorage } from '../localstorage';
import _ from 'lodash';

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
    }

    private initAxios() {
        const source: CancelTokenSource = Axios.CancelToken.source();
        const baseURL = `${this.host}/${this.endPoint}`;
        const http = Axios.create({
            baseURL,
            cancelToken: source.token,
            headers: {
                "content-type": "application/json",
            }
        });

        // Add a request interceptor to set headers for each request
        http.interceptors.request.use(config => {
            config.headers.Authorization = getStorage("IdToken") || '';
            return config;
        });

        // Add a response interceptor to handle all responses
        http.interceptors.response.use(
            (response: AxiosResponse) => {
                // Middleware to process the response
                
                return response; // Pass the response back
            },
            (error) => {
                // Handle response errors here

                const status = _.get(error, "response.status")

                if (status === 401 || status === 403) {
                    deleteStorage("IdToken")
                    deleteStorage("RefreshToken")
                    deleteStorage("AccessToken")

                    window.location.href = "/login"
                }

                return Promise.reject(error);
            }
        );

        return { source, http };
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
