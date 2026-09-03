import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import Gallery from '@/components/Gallery/Gallery';
import About from '@/components/About/About';
import Testimonial from '@/components/Testimonial/Testimonial';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VideoPlayer />
        <Gallery />
        <About />
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
