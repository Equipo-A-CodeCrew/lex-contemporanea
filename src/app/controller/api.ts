import {HttpClient} from "@angular/common/http";
import {ApiResult, State} from "./api-result";

const URL: string = `https://www.boe.es/datosabiertos/api/boe/sumario/`;

export class API {
    constructor(private readonly http: HttpClient) {
    }

    getByDate(date: string): ApiResult {
        console.log("Searching...");
        const apiResult = new ApiResult();
        this.http.get(`${URL}${date}`, {responseType: 'text' as 'json'}).subscribe({
            next: (response: any) => {
                const responseText = typeof response === 'string' ? response : JSON.stringify(response);
                console.log('Respuesta cruda:', responseText.substring(0, 300));

                apiResult.name = `Sumario BOE ${date}`;
                apiResult.state = State.Ok;
                try {
                    apiResult.data = JSON.parse(responseText);
                } catch {
                    // Si no es JSON, devolvemos el XML como string
                    apiResult.data = responseText;
                }

            },
            error: (error: any) => {
                console.error('Error:', error);
                apiResult.name = `Sumario BOE ${date}`;
                apiResult.state = State.Fail;
                apiResult.data = error.message || `Status: ${error.status}`;

            }
        });
        return apiResult;
    }
}