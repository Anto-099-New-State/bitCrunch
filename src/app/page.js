import ChatBot from "@/_components/ChatBot";
import Footer from "@/_components/Footer";
import Menu from "@/_components/Menu";
import Message from "@/_components/Message";
import Navbar from "@/_components/Navbar";
export default function Home() {
  return (

    <div className="h-screen bg-black" >
      <div className="py-1 bg-none">
      <Navbar />
      </div>
          <div className="flex ...">
    <div className="w-24 flex-auto ..."><Menu /></div>
    <div className="w-60 flex-auto ..."><Message /></div>
    <div className="w-44 flex-auto ..."></div>
    <Footer/>
  </div>
    </div>

  );
}
