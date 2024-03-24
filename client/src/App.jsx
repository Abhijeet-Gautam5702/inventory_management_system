import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";


function App() {
  return (
    <div className="h-screen gradient-background font-primary flex flex-col justify-start items-center">
      <Header />
      <Hero/>
      <Footer/>
    </div>
  );
}

export default App;
