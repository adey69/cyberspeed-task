type Config = {
  authHeader: string;
  baseUrl?: string;
};

export abstract class Base {
  private authHeader: string;
  private baseUrl: string;

  constructor(config: Config) {
    this.authHeader = config.authHeader;
    this.baseUrl = config.baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit,
    resource?: string,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authHeader}`,
    };
    const config = Object.assign({}, options, { headers });

    const response = await fetch(url, config);
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
    if (response.status === 401) {
      throw new Error("You're not authorized to access this resource.");
    } else if (response.status === 404) {
      throw new Error(
        `The requested resource i.e. ${resource}, could not be found.`,
      );
    }
    throw new Error('Something went wrong.');
  }
}
