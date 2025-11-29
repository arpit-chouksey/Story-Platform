'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, CheckCircle2, Loader2, ToggleLeft, ToggleRight, History, GitBranch } from 'lucide-react'
import { storyProtocol, type IPAsset } from '@/lib/story-protocol'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  ipAsset?: IPAsset
  isRegistering?: boolean
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. Every response I generate can be automatically registered as IP on Story Protocol. Enable the toggle below to start registering outputs.',
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [autoRegister, setAutoRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = `This is a generated response to: "${input}". In a real implementation, this would come from an AI model like GPT-4 or Claude. The response can be automatically registered as IP if the toggle is enabled.`

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now(),
        isRegistering: autoRegister,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Auto-register if enabled
      if (autoRegister) {
        try {
          const ipAsset = await storyProtocol.registerIP({
            hash: await calculateHash(aiResponse),
            metadata: {
              title: `AI Output: ${input.substring(0, 50)}...`,
              description: aiResponse,
              type: 'ai-output',
            },
            owner: '0x' + '0'.repeat(40),
          })

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, ipAsset, isRegistering: false }
                : msg
            )
          )
        } catch (error) {
          console.error('Registration error:', error)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? { ...msg, isRegistering: false }
                : msg
            )
          )
        }
      } else {
        setIsLoading(false)
      }
    }, 1000)
  }

  const calculateHash = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const handleRegisterOutput = async (messageId: string, content: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isRegistering: true } : msg
      )
    )

    try {
      const ipAsset = await storyProtocol.registerIP({
        hash: await calculateHash(content),
        metadata: {
          title: `AI Output: ${content.substring(0, 50)}...`,
          description: content,
          type: 'ai-output',
        },
        owner: '0x' + '0'.repeat(40),
      })

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, ipAsset, isRegistering: false } : msg
        )
      )
    } catch (error) {
      console.error('Registration error:', error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isRegistering: false } : msg
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">AI Chat with Auto-IP Registration</h1>
          <p className="text-gray-400">Conversational AI that automatically registers outputs as IP</p>
        </div>

        {/* Auto-Register Toggle */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {autoRegister ? (
                <ToggleRight className="w-8 h-8 text-primary-400" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-500" />
              )}
              <div>
                <p className="font-semibold">Auto-Register Outputs</p>
                <p className="text-sm text-gray-400">
                  Automatically register all AI-generated responses as IP assets
                </p>
              </div>
            </div>
            <button
              onClick={() => setAutoRegister(!autoRegister)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                autoRegister
                  ? 'bg-primary-500/20 text-primary-300'
                  : 'bg-dark-700 text-gray-400'
              }`}
            >
              {autoRegister ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="card h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-500/20 text-gray-100'
                      : 'bg-dark-700 text-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {message.role === 'assistant' && (
                      <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === 'assistant' && (
                    <div className="mt-3 pt-3 border-t border-dark-600 space-y-2">
                      {message.isRegistering ? (
                        <div className="flex items-center gap-2 text-sm text-primary-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registering as IP...</span>
                        </div>
                      ) : message.ipAsset ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Registered as IP Asset</span>
                          </div>
                          <div className="text-xs text-gray-400 font-mono bg-dark-800 p-2 rounded">
                            IP ID: {message.ipAsset.id}
                          </div>
                          <button
                            onClick={() => {
                              // View lineage
                            }}
                            className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300"
                          >
                            <GitBranch className="w-3 h-3" />
                            View Lineage
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRegisterOutput(message.id, message.content)}
                          className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          Register as IP
                        </button>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-700 rounded-lg p-4">
                  <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="input-field flex-1"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="btn-primary px-6"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Version History */}
        <div className="card mt-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold">Version History</h3>
          </div>
          <p className="text-sm text-gray-400">
            Track all registered IP assets and their derivative relationships
          </p>
        </div>
      </div>
    </div>
  )
}

