// app/api/quote/route.js

export async function POST() {
  console.log('=== QUOTE API CALLED ===');
  
  try {
    // Get environment variables with NEXT_PUBLIC_ prefix
    const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;
    
    console.log('Environment check:');
    console.log('- API Key exists:', !!apiKey);
    console.log('- Endpoint exists:', !!endpoint);
    
    if (!apiKey) {
      console.error('❌ Missing NEXT_PUBLIC_AZURE_API_KEY');
      // Return fallback quote instead of error
      return new Response(JSON.stringify({
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!endpoint) {
      console.error('❌ Missing NEXT_PUBLIC_AZURE_ENDPOINT');
      return new Response(JSON.stringify({
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "courage"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('✅ Making request to Azure OpenAI...');

    // Add randomness to ensure different quotes each time
    const categories = ['motivation', 'wisdom', 'success', 'life', 'inspiration', 'creativity', 'courage', 'perseverance', 'leadership', 'happiness'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomSeed = Math.floor(Math.random() * 1000);
    
    const requestBody = {
      messages: [
        {
          role: "system",
          content: "You are a quote generator. You must respond with ONLY valid JSON in this exact format: {\"text\": \"quote text here\", \"author\": \"Author Name\", \"category\": \"motivation\"}. Do not include any other text, explanations, or formatting. Just the JSON. Generate a unique, inspiring quote each time."
        },
        {
          role: "user",
          content: `Generate a unique inspirational quote about ${randomCategory}. Make it different from common quotes. Include the author and category. Seed: ${randomSeed}`
        }
      ],
      max_tokens: 200,
      temperature: 0.9,  // Higher temperature for more creativity
      top_p: 0.95,
      presence_penalty: 0.6,  // Encourage new content
      frequency_penalty: 0.3   // Reduce repetition
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Azure API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure API error:', response.status, errorText);
      
      // If API fails, return an error instead of fallback so user knows what happened
      return new Response(JSON.stringify({
        error: `Azure API failed: ${response.status} - ${errorText}`,
        fallback: {
          text: "The future belongs to those who believe in the beauty of their dreams.",
          author: "Eleanor Roosevelt",
          category: "inspiration"
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    console.log('Azure API response data:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from Azure API');
      return new Response(JSON.stringify({
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        category: "leadership"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let content = data.choices[0].message.content.trim();
    console.log('Raw AI response:', content);

    // Clean up the response - remove any markdown formatting
    content = content.replace(/```json\n?|\n?```/g, '').trim();
    
    // Remove any text before the first { or after the last }
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      content = content.substring(jsonStart, jsonEnd + 1);
    }

    let quote;
    try {
      quote = JSON.parse(content);
      console.log('Successfully parsed quote:', quote);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Content that failed to parse:', content);
      
      // Return fallback quote
      quote = {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
        category: "wisdom"
      };
    }

    // Validate quote structure
    if (!quote || typeof quote !== 'object' || !quote.text || !quote.author || !quote.category) {
      console.warn('Invalid quote structure, using fallback');
      quote = {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "motivation"
      };
    }

    // Ensure all fields are strings and not empty
    quote = {
      text: String(quote.text || "Life is what happens to you while you're busy making other plans."),
      author: String(quote.author || "John Lennon"),
      category: String(quote.category || "life")
    };

    console.log('✅ Final quote being returned:', quote);

    return new Response(JSON.stringify(quote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Unexpected error in quote API:', error);
    
    // Always return a working quote, never an error
    const fallbackQuote = {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
      category: "motivation"
    };
    
    return new Response(JSON.stringify(fallbackQuote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}