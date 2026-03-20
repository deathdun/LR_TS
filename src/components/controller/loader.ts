declare const process: { env: { [key: string]: string | undefined } };

type QueryParams = Record<string, string | undefined>;

export class Loader {
    protected baseLink: string;
    protected options: QueryParams;

    constructor(baseLink: string, options: QueryParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T = unknown>(
        { endpoint, options = {} }: { endpoint: string; options?: QueryParams },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    protected makeUrl(options: QueryParams, endpoint: string): string {
        const urlOptions: QueryParams = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (typeof value !== 'undefined') {
                url += `${key}=${encodeURIComponent(value)}&`;
            }
        });

        return url.slice(0, -1);
    }

    protected load<T = unknown>(
        method: 'GET' | 'POST',
        endpoint: string,
        callback: (data: T) => void,
        options: QueryParams = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => {
                console.error(err);
            });
    }
}

export default Loader;