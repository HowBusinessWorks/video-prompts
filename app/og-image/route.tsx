import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 120,
            height: 120,
            background: '#FFD93D',
            border: '6px solid #000',
            borderRadius: '20px',
            transform: 'rotate(-15deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            width: 100,
            height: 100,
            background: '#6BCB77',
            border: '6px solid #000',
            borderRadius: '50%',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            border: '8px solid #000',
            borderRadius: '30px',
            padding: '60px 80px',
            boxShadow: '16px 16px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              margin: 0,
              marginBottom: 20,
              color: '#000',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            AI Prompts Gallery
          </h1>
          <p
            style={{
              fontSize: 32,
              margin: 0,
              color: '#666',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Discover Quality AI Generation Prompts
          </p>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              gap: '15px',
              marginTop: '40px',
            }}
          >
            {['Midjourney', 'DALL-E', 'Sora', 'Stable Diffusion'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: '#FF6B9D',
                  border: '4px solid #000',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
