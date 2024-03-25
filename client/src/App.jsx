import { Header, Hero, Footer } from "./components";

function App() {
  return (
    <div className="h-screen gradient-background font-primary flex flex-col justify-start items-center">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
