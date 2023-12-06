import { OpenAI } from 'openai';
export const get_openai = (apiKey: string) => new OpenAI({apiKey, dangerouslyAllowBrowser: true})
