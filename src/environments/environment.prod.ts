// @ts-ignore
import config from '../../auth_config.json';

const { domain, clientId, errorPath, audience } = config as {
  domain: string;
  clientId: string;
  errorPath: string;
  audience:string;
};

const apiUri = 'https://backend-env.eba-g9uchpeu.us-west-2.elasticbeanstalk.com';

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    errorPath,
    audience: "http://backend-env.eba-g9uchpeu.us-west-2.elasticbeanstalk.com/"
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  baseUrl: "https://backend-env.eba-g9uchpeu.us-west-2.elasticbeanstalk.com",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://d1jltnx8c2x3v1.cloudfront.net/',
  }
};
