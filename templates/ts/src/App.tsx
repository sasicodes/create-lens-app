import "./styles/App.css";

function App() {
  return (
    <main className="main">
      <div className="description">
        <p>
          Get started by editing&nbsp;
          <code className="code">pages/index.tsx</code>
        </p>
        <div>
          <a
            href="https://docs.lens.xyz/docs/sdk-react-intro?utm_source=create-lens-app&utm_campaign=create-lens-app"
            target="_blank"
            rel="noopener noreferrer"
            className="docsLink"
          >
            Lens Docs
          </a>
        </div>
      </div>

      <div className="center">
        <img
          className="logo"
          src="/illustration.png"
          alt="Next.js Logo"
          width={600}
          height={450}
          draggable={false}
        />
      </div>

      <div className="grid">
        <a
          href="/feed"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>User Feed</h2>
        </a>

        <a
          href="/profile"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Profile</h2>
        </a>

        <a
          href="/publications"
          className="card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Publication</h2>
        </a>
      </div>
    </main>
  );
}

export default App;
