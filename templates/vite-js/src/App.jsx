import Login from "./components/Login";
import Profile from "./components/Profile";
import Publication from "./components/Publication";
import "./styles/App.css";

function App() {
  return (
    <main className="main">
      <div className="description">
        <p>
          Get started by editing&nbsp;
          <code className="code">src/App.tsx</code>
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
          alt="Lens"
          width={600}
          height={450}
          draggable={false}
        />
      </div>

      <div className="grid">
        <Login />

        <Profile />

        <Publication />
      </div>
    </main>
  );
}

export default App;
