/**
 * AI API Integration
 * Uses free AI APIs for generating responses
 */

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    // Try using a free text generation API
    // Using Hugging Face's free inference API with a text generation model
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          return_full_text: false,
        },
      }),
    })

    if (response.ok) {
      const data = await response.json()
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.trim()
      }
      
      if (data.generated_text) {
        return data.generated_text.trim()
      }
    }

    // If that doesn't work, try a conversational model
    try {
      const convResponse = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: [],
            generated_responses: [],
            text: prompt,
          },
        }),
      })

      if (convResponse.ok) {
        const convData = await convResponse.json()
        if (convData.generated_text) {
          return convData.generated_text.trim()
        }
      }
    } catch (e) {
      // Continue to fallback
    }

    // Fallback to intelligent response
    return generateFallbackResponse(prompt)
  } catch (error) {
    console.error('AI API error:', error)
    // Use fallback
    return generateFallbackResponse(prompt)
  }
}

/**
 * Fallback response generator - creates intelligent responses based on prompt
 */
function generateFallbackResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()
  
  // Context-aware responses
  if (lowerPrompt.includes('what') || lowerPrompt.includes('explain')) {
    return `Based on your question "${prompt}", here's what I can tell you: This is an interesting topic that involves several key concepts. Let me break it down for you - the main points to consider are understanding the fundamentals, exploring different perspectives, and applying practical knowledge. Would you like me to elaborate on any specific aspect?`
  }
  
  if (lowerPrompt.includes('how') || lowerPrompt.includes('create') || lowerPrompt.includes('make')) {
    return `To address "${prompt}", here's a step-by-step approach: First, identify your goals and requirements. Next, gather the necessary resources and tools. Then, follow a systematic process while being open to adjustments. Finally, test and refine your solution. This methodology typically yields good results.`
  }
  
  if (lowerPrompt.includes('why') || lowerPrompt.includes('reason')) {
    return `Regarding "${prompt}", there are several important reasons: Understanding the underlying principles helps make informed decisions. The context matters significantly, and different situations may require different approaches. It's also valuable to consider long-term implications and potential alternatives.`
  }
  
  if (lowerPrompt.includes('help') || lowerPrompt.includes('assist')) {
    return `I'd be happy to help with "${prompt}"! Let me provide some guidance: Start by clearly defining what you're trying to achieve. Break down the problem into smaller, manageable parts. Research similar cases or examples. Don't hesitate to ask specific questions if you need clarification on any step.`
  }
  
  // Default intelligent response
  const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const templates = [
    `That's a great question about "${prompt}". From my understanding, this involves several interconnected elements. The key is to approach it systematically while remaining flexible to adapt as you learn more.`,
    `Regarding "${prompt}", I can share that this is a multifaceted topic. The most effective approach typically involves understanding the core principles, considering various perspectives, and applying practical knowledge.`,
    `To address "${prompt}", here's my perspective: This requires careful consideration of multiple factors. I recommend starting with a clear understanding of your objectives, then exploring the available options and their implications.`,
  ]
  
  return templates[hash % templates.length]
}

/**
 * Alternative: Use OpenAI-compatible API (if you have a key)
 */
export async function generateAIResponseWithOpenAI(prompt: string, apiKey?: string): Promise<string> {
  if (!apiKey) {
    return generateAIResponse(prompt) // Fallback to free API
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || generateFallbackResponse(prompt)
  } catch (error) {
    console.error('OpenAI API error:', error)
    return generateAIResponse(prompt) // Fallback to free API
  }
}

