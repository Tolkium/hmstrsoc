export interface Env {
  production: boolean;
  env: 'dev' | 'prod';

  moralis: {
    /** Moralis Application ID */
    appId: string;
    /** Moralis Server url */
    serverUrl: string;
  };
}

export const devEnv: Env = {
  production: false,
  env: 'dev',
  moralis: {
    appId: '0NByxgvUkUsR4442EZsmb4rxQeQlHQoulvF3r7eF',
    serverUrl: 'https://oacntfqnswsk.usemoralis.com:2053/server'
  },
};
export const prodEnv: Env = {
  production: true,
  env: 'prod',
  moralis: {
    appId: '0NByxgvUkUsR4442EZsmb4rxQeQlHQoulvF3r7eF',
    serverUrl: 'https://oacntfqnswsk.usemoralis.com:2053/server'
  }
};
