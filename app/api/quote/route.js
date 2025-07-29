// app/api/quote/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('API route called (App Router)');
    console.log('Environment variables:', {
      hasApiKey: !!process.env.NEXT_PUBLIC_AZURE_API_KEY,
      hasEndpoint: !!process.env.NEXT_PUBLIC_AZURE_ENDPOINT
    });

    const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;

    if (!apiKey || !endpoint) {
      console.error('Missing environment variables');
      return NextResponse.json(
        { message: 'Missing Azure API key or endpoint' },
        { status: 500 }
      );
    }

    console.log('Making request to Azure OpenAI...');
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a wise quote generator. Create one powerful, inspirational quote. Respond with JSON in this exact format: {"text": "quote text here", "author": "author name", "category": "motivation"}. Make the quote meaningful and inspiring.'
          },
          {
            role: 'user',
            content: 'Generate a meaningful inspirational quote for today.'
          }
        ],
        max_tokens: 150,
        temperature: 0.8
      })
    });

    console.log('Azure response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure error response:', errorText);
      return NextResponse.json(
        { message: `Azure API failed: ${response.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Azure response data:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { message: 'Invalid response format from Azure OpenAI' },
        { status: 500 }
      );
    }

    const content = data.choices[0].message.content.trim();
    console.log('GPT content:', content);
    
    let quoteData;
    try {
      quoteData = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse JSON:', content);
      // Fallback quote if parsing fails
      quoteData = {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
      };
    }
    
    console.log('Final quote data:', quoteData);
    return NextResponse.json(quoteData, { status: 200 });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        message: error.message || 'Failed to generate quote',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}