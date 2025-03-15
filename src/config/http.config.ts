import { environment } from '../environments/environment';

export const BACKEND = environment.backendUrl;
export const CONSUMER_KEY = environment.consumerKey ?? '';
export const CONSUMER_SECRET = environment.consumerSecret ?? '';
export const GUEST_PW = environment.password;
export const CREW_PW = environment.crewPw;
export const SALT = environment.salt;
export const TICKETS_ON = true;
