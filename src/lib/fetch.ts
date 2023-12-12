interface RequestInit {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
	body?: "string";
  
}

interface ResponseInit {
	url: string;
	headers: any;
	ok: boolean;
	type: "text" | "json";
	text: () => string;
	json: () => object | Promise<Object>;
}

export default async function fetch(
	url: string,
	options: RequestInit,
): Promise<ResponseInit> {
	const textOutput = "{}";

	let responseOk = true;
	let responseHeaders = {};

	return new Promise((resolve, reject) => {
		const response: ResponseInit = {
			url,
			headers: responseHeaders,
			ok: responseOk,
			type: "json",
			text: () => textOutput,
			json: () => JSON.parse(textOutput),
		};

		resolve(response);
	});
}
