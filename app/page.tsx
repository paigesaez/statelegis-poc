export default function Home() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <h1>StateLegis POC</h1>
      <p>Welcome to the clean implementation.</p>
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }}>
        <h2>Core Features:</h2>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Bill Tracking</li>
          <li>Representative Information</li>
          <li>Legislative Session Management</li>
        </ul>
      </div>
    </div>
  )
}
