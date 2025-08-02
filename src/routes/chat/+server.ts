import { json } from '@sveltejs/kit';
import { instructionMap } from './constants'
import { API_KEY } from '$env/static/private';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: API_KEY
});


export async function POST({ request }) {
    const { messages, id } : { messages: Messages, id:string } = await request.json();

    const instructions = instructionMap[id] || 'Act like a wall';

    const response = await client.responses.create({
        model: 'gpt-4.1',
        instructions: instructions,
        input: messages,
    });

	return json({reply: response.output_text, instructions});
}