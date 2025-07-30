// app/api/quote/route.js

export async function POST(request) {
  const startTime = Date.now();
  console.log('\n=== QUOTE API CALLED ===');
  
  try {
    // Step 1: Parse request (optional)
    let requestData = {};
    try {
      const body = await request.text();
      if (body) {
        requestData = JSON.parse(body);
      }
    } catch (e) {
      // Ignore request body parsing errors
    }
    
    // Step 2: Get environment variables
    const apiKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;
    
    console.log('🔍 Environment Check:');
    console.log('  - API Key exists:', !!apiKey);
    console.log('  - API Key length:', apiKey?.length || 0);
    console.log('  - API Key first 8 chars:', apiKey?.substring(0, 8) || 'NONE');
    console.log('  - Endpoint exists:', !!endpoint);
    console.log('  - Endpoint:', endpoint || 'NONE');
    
    if (!apiKey) {
      console.error('❌ MISSING API KEY');
      return new Response(JSON.stringify({
        error: 'Missing NEXT_PUBLIC_AZURE_API_KEY in environment',
        debug: {
          hasApiKey: false,
          envKeys: Object.keys(process.env).filter(k => k.includes('AZURE')),
          timestamp: new Date().toISOString()
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!endpoint) {
      console.error('❌ MISSING ENDPOINT');
      return new Response(JSON.stringify({
        error: 'Missing NEXT_PUBLIC_AZURE_ENDPOINT in environment',
        debug: {
          hasEndpoint: false,
          envKeys: Object.keys(process.env).filter(k => k.includes('AZURE')),
          timestamp: new Date().toISOString()
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 3: Create request parameters
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 1000000);
    const requestNumber = requestData.requestNumber || 1;
    
    console.log('🎯 Request Parameters:');
    console.log('  - Timestamp:', timestamp);
    console.log('  - Random Seed:', randomSeed);
    console.log('  - Request Number:', requestNumber);

    // Step 4: Prepare Azure request
    const azureRequest = {
      messages: [
        {
          role: "system",
          content: "You are a quote generator. You MUST respond with ONLY valid JSON in this exact format: {\"text\": \"quote text\", \"author\": \"Author Name\", \"category\": \"motivation\"}. No other text, no explanations, no markdown. Just pure JSON."
        },
        {
          role: "user",
          content: `Create a unique inspirational quote. Make it completely different from any previous quotes. Request: ${requestNumber}, Seed: ${randomSeed}, Time: ${timestamp}`
        }
      ],
      max_tokens: 150,
      temperature: 1.0,
      top_p: 0.9,
      presence_penalty: 1.5,
      frequency_penalty: 1.5
    };

    console.log('📤 Making Azure Request:');
    console.log('  - Endpoint:', endpoint);
    console.log('  - Temperature:', azureRequest.temperature);
    console.log('  - Max Tokens:', azureRequest.max_tokens);

    // Step 5: Call Azure API
    const azureResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(azureRequest),
    });

    console.log('📥 Azure Response:');
    console.log('  - Status:', azureResponse.status);
    console.log('  - Status Text:', azureResponse.statusText);
    console.log('  - Headers:', Object.fromEntries(azureResponse.headers.entries()));

    // Step 6: Handle response
    if (!azureResponse.ok) {
      const errorText = await azureResponse.text();
      console.error('❌ Azure API Error:');
      console.error('  - Status:', azureResponse.status);
      console.error('  - Error Text:', errorText);
      
      return new Response(JSON.stringify({
        error: `Azure API returned ${azureResponse.status}`,
        details: errorText,
        debug: {
          endpoint: endpoint,
          hasValidKey: apiKey?.length === 32,
          requestParams: { timestamp, randomSeed, requestNumber },
          timestamp: new Date().toISOString()
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 7: Parse Azure response
    const azureData = await azureResponse.json();
    console.log('✅ Azure Response Data:');
    console.log('  - Choices available:', !!azureData.choices);
    console.log('  - Choices length:', azureData.choices?.length || 0);
    console.log('  - First choice exists:', !!azureData.choices?.[0]);
    console.log('  - Message exists:', !!azureData.choices?.[0]?.message);
    console.log('  - Content exists:', !!azureData.choices?.[0]?.message?.content);

    if (!azureData.choices?.[0]?.message?.content) {
      console.error('❌ Invalid Azure response structure');
      console.error('Full response:', JSON.stringify(azureData, null, 2));
      
      return new Response(JSON.stringify({
        error: 'Invalid response structure from Azure',
        debug: {
          azureResponse: azureData,
          timestamp: new Date().toISOString()
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 8: Extract and clean content
    let content = azureData.choices[0].message.content.trim();
    console.log('📝 Raw AI Content:', content);

    // Clean up the content
    content = content.replace(/```json\n?|\n?```/g, '').trim();
    
    // Try to extract JSON if it's wrapped in other text
    const jsonMatch = content.match(/\{[^}]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }

    console.log('🧹 Cleaned Content:', content);

    // Step 9: Parse the quote
    let quote;
    try {
      quote = JSON.parse(content);
      console.log('✅ Parsed Quote:', quote);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError.message);
      console.error('Content that failed:', content);
      
      return new Response(JSON.stringify({
        error: 'Failed to parse AI response as JSON',
        debug: {
          rawContent: content,
          parseError: parseError.message,
          timestamp: new Date().toISOString()
        }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 10: Validate quote structure
    if (!quote || typeof quote !== 'object') {
      console.error('❌ Quote is not an object:', quote);
      return new Response(JSON.stringify({
        error: 'Quote is not a valid object',
        debug: { quote, timestamp: new Date().toISOString() }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!quote.text || !quote.author || !quote.category) {
      console.error('❌ Quote missing required fields:', quote);
      return new Response(JSON.stringify({
        error: 'Quote missing required fields (text, author, category)',
        debug: { quote, timestamp: new Date().toISOString() }
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Step 11: Create final quote
    const finalQuote = {
      text: String(quote.text).trim(),
      author: String(quote.author).trim(),
      category: String(quote.category).trim().toLowerCase(),
      meta: {
        requestNumber: requestNumber,
        timestamp: timestamp,
        processingTime: Date.now() - startTime
      }
    };

    console.log('🎉 SUCCESS! Final Quote:', finalQuote);
    console.log(`⏱️  Total processing time: ${Date.now() - startTime}ms\n`);

    return new Response(JSON.stringify(finalQuote), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Processing-Time': `${Date.now() - startTime}ms`
      }
    });

  } catch (error) {
    console.error('❌ UNEXPECTED ERROR:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({
      error: 'Unexpected server error',
      details: error.message,
      debug: {
        stack: error.stack,
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}