import Axios, { CancelTokenSource, AxiosStatic, AxiosInstance, AxiosRequestConfig } from 'axios';


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
        this.host = host ?? import.meta.env.VITE_API_URL; // must be set before initAxios
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
        });

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
