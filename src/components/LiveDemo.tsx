"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Copy, Download, FileText, Sparkles, Check, Globe, Brain, Zap, Search } from "lucide-react"

interface GenerationStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export const LiveDemo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [projectUrl, setProjectUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const generationSteps: GenerationStep[] = [
    {
      id: "crawl",
      title: "Crawling Website",
      description: "Fetching website content and metadata",
      icon: <Globe className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "analyze",
      title: "AI Analysis",
      description: "Processing content with Groq AI",
      icon: <Brain className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "extract",
      title: "Extracting Information",
      description: "Identifying key documentation elements",
      icon: <Search className="w-5 h-5" />,
      completed: false,
    },
    {
      id: "generate",
      title: "Generating llms.txt",
      description: "Creating your optimized file",
      icon: <Zap className="w-5 h-5" />,
      completed: false,
    },
  ]

  const updateProgress = (stepIndex: number, stepProgress: number) => {
    const totalProgress = ((stepIndex + stepProgress) / generationSteps.length) * 100
    setProgress(totalProgress)
  }

  const handleGenerate = async () => {
    if (!projectUrl.trim()) return

    try {
      new URL(projectUrl)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setIsGenerating(true)
    setIsGenerated(false)
    setError("")
    setCurrentStep(0)
    setProgress(0)

    try {
      // Step 1: Crawl Website
      setCurrentStep(0)
      updateProgress(0, 0)

      const crawlResponse = await fetch("/api/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: projectUrl }),
      })

      if (!crawlResponse.ok) {
        throw new Error("Failed to crawl website")
      }

      const crawlData = await crawlResponse.json()
      updateProgress(0, 1)

      // Step 2: AI Analysis
      setCurrentStep(1)
      updateProgress(1, 0)

      const generateResponse = await fetch("/api/generate-llms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: projectUrl,
          content: crawlData.content,
          title: crawlData.title,
          description: crawlData.description,
        }),
      })

      if (!generateResponse.ok) {
        throw new Error("Failed to generate llms.txt")
      }

      updateProgress(1, 1)

      // Step 3: Extract Information
      setCurrentStep(2)
      updateProgress(2, 0.5)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateProgress(2, 1)

      // Step 4: Generate Final Content
      setCurrentStep(3)
      updateProgress(3, 0)

      const result = await generateResponse.json()
      setGeneratedContent(result.llmsTxt)

      updateProgress(3, 1)
      setProgress(100)
      setIsGenerating(false)
      setIsGenerated(true)
    } catch (error) {
      console.error("Generation error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsGenerating(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "llms.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <section ref={ref} className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <FileText className="w-4 h-4 " />
              <span className="text-sm font-medium ">LLM.txt Awaits</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              LLMs File Generator

{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
In One Click
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enter your project URL and watch our AI generate a perfect llms.txt file
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto" id="generate">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 lg:col-span-1"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Project Input</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Project URL or Repository</label>
                      <input
                        type="url"
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
                    )}

                    <motion.button
                      onClick={handleGenerate}
                      disabled={!projectUrl.trim() || isGenerating}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Generate llms.txt
                        </div>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Output Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 lg:col-span-2"
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Generated llms.txt</h3>

                    {isGenerated && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 text-sm"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-80 overflow-y-auto">
                    {!isGenerated ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Your generated llms.txt will appear here</p>
                        </div>
                      </div>
                    ) : (
                      <motion.pre
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed"
                      >
                        {generatedContent}
                      </motion.pre>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Generation Modal */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl"
            >
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80"
                  />
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                      rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-60 blur-sm"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">
                AI agents are analyzing your website
              </h3>
              <p className="text-gray-600 text-center mb-8">This can take a minute, please don&apos;t close the page.</p>

              <div className="mb-6">
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-center mt-2 text-sm text-gray-600">{Math.round(progress)}% complete</div>
              </div>

              <div className="space-y-3">
                {generationSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.5,
                      scale: index === currentStep ? 1.02 : 1,
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        index <= currentStep
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div className={`font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-600"}`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">{step.description}</div>
                    </div>
                    {index < currentStep && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <Check className="w-5 h-5 text-green-600" />
                      </motion.div>
                    )}
                    {index === currentStep && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="ml-auto"
                      >
                        <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
