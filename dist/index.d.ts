import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';

export declare class ExpectResponse<Data> {
    private readonly _res;
    constructor(_res: Response_2<Data> | Promise<Response_2<Data>>);
    private _response;
    private readonly _expectHeaders;
    private readonly _expectHasHeaderKeys;
    private _expectStatus?;
    private _expectBody?;
    private _toTestBody;
    private _filterBody?;
    expectHasHeader(key: keyof AxiosResponse["headers"]): this;
    expectHeader(key: keyof AxiosResponse["headers"], expectValue: string | RegExp): this;
    expectStatus(code: number): this;
    expectBody(data: Data): this;
    expectBodyData(data: any): this;
    filterBody(cb: (data: any) => any): this;
    done(): Promise<void>;
    private _toBe;
    private _buildToBeObject;
    private _buildStatusObject;
    private _buildBodyObject;
    private _buildHasHeaderKeyObject;
}

export declare function httpTest<Data = any>(config: AxiosRequestConfig | (() => AxiosRequestConfig)): ExpectResponse<Data>;

declare interface Response_2<Data> extends Pick<AxiosResponse<Data>, "headers" | "data" | "status"> {
    href: string;
}
export { Response_2 as Response }

export declare function setDefaultAxiosConfig(config: AxiosRequestConfig): void;

export { }
