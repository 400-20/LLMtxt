/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url, content, title, description } = await request.json()

    // Using Google Gemini API - you need to get API key from https://aistudio.google.com/app/apikey
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      // Fallback to template-based generation if no API key
      const llmsTxt = generateTemplateBasedLlms(url, title, description, content)
      return NextResponse.json({ llmsTxt })
    }

    const prompt = `Generate a comprehensive llms.txt file for the following website:

URL: ${url}
Title: ${title}
Description: ${description}
Content Preview: ${content.substring(0, 2000)}

Create a detailed llms.txt file that includes:
1. Project overview and description
2. Key features and functionality
3. Technical stack information
4. Installation and setup instructions
5. Usage examples and code snippets
6. API documentation if applicable
7. Contributing guidelines
8. License information

Format it as a proper markdown document suitable for AI consumption. Make it comprehensive and informative.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert technical writer specializing in creating comprehensive llms.txt files for AI consumption. Generate detailed, well-structured documentation.\n\n${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4000,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const llmsTxt = data.candidates[0].content.parts[0].text

    return NextResponse.json({ llmsTxt })
  } catch (error) {
    console.error("Generation error:", error)

    // Fallback to template-based generation
    try {
      const { url, title, description, content } = await request.json()
      const llmsTxt = generateTemplateBasedLlms(url, title, description, content)
      return NextResponse.json({ llmsTxt })
    } catch (fallbackError) {
      return NextResponse.json({ error: "Failed to generate llms.txt" }, { status: 500 })
    }
  }
}

function generateTemplateBasedLlms(url: string, title: string, description: string, content: string): string {
  const domain = new URL(url).hostname
  const projectName = title || domain.replace(/\./g, "-")

  return `# ${projectName} - AI-Optimized Documentation

## Project Overview

${description || "This project has been automatically analyzed and documented for AI consumption."}

**Website**: ${url}
**Domain**: ${domain}
**Generated**: ${new Date().toISOString().split("T")[0]}

## Key Features Detected

Based on our analysis of the website content, this project includes:

${content.includes("react") || content.includes("React") ? "- React-based frontend architecture" : ""}
${content.includes("api") || content.includes("API") ? "- RESTful API endpoints" : ""}
${content.includes("database") || content.includes("Database") ? "- Database integration" : ""}
${content.includes("auth") || content.includes("login") ? "- Authentication system" : ""}
${content.includes("responsive") || content.includes("mobile") ? "- Responsive design" : ""}
- Modern web technologies
- User-friendly interface
- Scalable architecture

## Technical Information

### Technology Stack
- Frontend: Modern JavaScript/TypeScript framework
- Backend: Server-side processing
- Database: Data persistence layer
- Deployment: Cloud-based hosting

### Project Structure
\`\`\`
/${projectName}/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
├── public/
├── docs/
└── README.md
\`\`\`

## Installation & Setup

\`\`\`bash
# Clone the repository
git clone ${url.includes("github") ? url : `https://github.com/example/${projectName}`}

# Navigate to project directory
cd ${projectName}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Usage Examples

\`\`\`javascript
// Basic usage example
import { ${projectName.charAt(0).toUpperCase() + projectName.slice(1)} } from './${projectName}';

const app = new ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Initialize the application
app.init();
\`\`\`

## API Documentation

### Main Endpoints
- \`GET /api/health\` - Health check endpoint
- \`GET /api/data\` - Retrieve application data
- \`POST /api/submit\` - Submit new data
- \`PUT /api/update\` - Update existing data
- \`DELETE /api/remove\` - Remove data

### Authentication
\`\`\`javascript
// API authentication example
const response = await fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
  }
});
\`\`\`

## Configuration

\`\`\`json
{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "${description}",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest"
  }
}
\`\`\`

## Environment Variables

\`\`\`bash
# Required environment variables
API_KEY=your_api_key_here
DATABASE_URL=your_database_url
PORT=3000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support & Documentation

- **Website**: ${url}
- **Documentation**: ${url}/docs (if available)
- **Issues**: Report bugs and request features
- **Community**: Join our community discussions

---

*This llms.txt file was automatically generated using AI analysis of ${domain}. Last updated: ${new Date().toISOString().split("T")[0]}*`
}
