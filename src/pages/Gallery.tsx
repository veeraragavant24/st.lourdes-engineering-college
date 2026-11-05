import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  Briefcase,
  Cpu,
  FlaskConical,
  Trophy,
  Users,
  Wifi,
  Camera,
  ArrowRight,
  X,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/8199762/pexels-photo-8199762.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Students studying in the library',
    category: 'Library',
  },
  {
    src: 'https://images.pexels.com/photos/16420473/pexels-photo-16420473.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Group of students collaborating in the library',
    category: 'Library',
  },
  {
    src: 'https://images.pexels.com/photos/5158945/pexels-photo-5158945.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Hostel building exterior',
    category: 'Hostel',
  },
  {
    src: 'https://images.pexels.com/photos/3520692/pexels-photo-3520692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Electronics and communication engineering lab',
    category: 'Labs',
  },
  {
    src: 'https://images.pexels.com/photos/3861960/pexels-photo-3861960.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Students working in a computer lab',
    category: 'Labs',
  },
  {
    src: 'https://images.pexels.com/photos/6804071/pexels-photo-6804071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Technical fest event',
    category: 'Events',
  },
  {
    src: 'https://images.pexels.com/photos/7683890/pexels-photo-7683890.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Sports day celebration',
    category: 'Campus Life',
  },
  {
    src: 'https://images.pexels.com/photos/39192309/pexels-photo-39192309.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Graduation ceremony',
    category: 'Events',
  },
  {
    src: 'https://images.pexels.com/photos/5940844/pexels-photo-5940844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Students collaborating on a project',
    category: 'Campus Life',
  },
  {
    src: 'https://images.pexels.com/photos/8811595/pexels-photo-8811595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Campus courtyard aerial view',
    category: 'Campus',
  },
  {
    src: 'https://images.pexels.com/photos/3861960/pexels-photo-3861960.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Engineering classroom session',
    category: 'Campus Life',
  },
  {
    src: 'https://images.pexels.com/photos/33175650/pexels-photo-33175650.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    alt: 'Placement drive interview',
    category: 'Placement',
  },
];



const categories = ['All', 'Library', 'Hostel', 'Labs', 'Events', 'Campus Life', 'Campus', 'Placement'];

const facilities = [
  { icon: BookOpen, title: 'Central Library', text: 'Extensive collection of books, e-resources, and digital journals.' },
  { icon: Building2, title: 'Hostel Facilities', text: 'Separate, safe, and comfortable hostels for boys and girls.' },
  { icon: Cpu, title: 'Computer Labs', text: 'Modern computing labs with high-speed internet and latest software.' },
  { icon: FlaskConical, title: 'Science Laboratories', text: 'Well-equipped labs for electronics, physics, and chemistry.' },
  { icon: Wifi, title: 'Campus Wi-Fi', text: 'High-speed wireless connectivity across the campus.' },
  { icon: Trophy, title: 'Sports & Recreation', text: 'Sports grounds and recreation facilities for student well-being.' },
];

export default function Gallery() {
  const { openModal } = useAdmissionModal();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  // Smooth scrolling for Gallery and Facilities navigation
  useEffect(() => {
    if (!location.hash) return;

    const sectionId = decodeURIComponent(location.hash.slice(1));

    let firstFrame = 0;
    let secondFrame = 0;

    const timer = window.setTimeout(() => {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          const section = document.getElementById(sectionId);

          if (!section) {
            console.warn(`Section not found: ${sectionId}`);
            return;
          }

          const headerOffset = 110;

          const top =
            section.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

          window.scrollTo({
            top: Math.max(0, top),
            behavior: 'smooth',
          });
        });
      });
    }, 300);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [location.pathname, location.hash]);
  return (

    <>
      <PageHero
        eyebrow="Life at ST. Lourdes"
        title="Campus Gallery"
        description="Explore the facilities, events, and vibrant campus life that make ST. Lourdes Engineering College a place to learn, grow, and belong."
        image="https://images.pexels.com/photos/8199762/pexels-photo-8199762.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="Gallery"
      />

      {/* Facilities overview */}
<section
  id="facilities"
  className="section-pad bg-white"
>
          <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">World-Class Infrastructure</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Campus Facilities
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group flex items-start gap-4 rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-maroon-700">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery grid with filters */}
<section
  id="gallery"
  className="section-pad bg-ivory"
>
          <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Moments & Memories</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Photo Gallery
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-maroon-600 text-gold-100 shadow-md'
                    : 'border border-gold/20 bg-white text-charcoal/60 hover:border-gold/40 hover:text-maroon-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((img, idx) => (
              <button
                key={`${img.src}-${idx}`}
                onClick={() => setLightbox(img)}
                className="group relative overflow-hidden rounded-xl border border-gold/10 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon-700">
                      {img.category}
                    </span>
                    <p className="mt-2 text-sm font-medium text-ivory line-clamp-1">{img.alt}</p>
                  </div>
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-maroon-900/50 text-gold opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Camera className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-maroon-600 to-maroon-800 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Users className="mx-auto h-10 w-10 text-gold" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl font-bold text-ivory sm:text-3xl">
            Become Part of Our Campus Community
          </h2>
          <p className="mt-3 text-ivory/70">
            Experience the facilities, friendships, and opportunities that await you at ST. Lourdes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button onClick={openModal} className="btn-gold">
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/contact" className="btn-outline-gold">Plan a Visit</Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="absolute inset-0 bg-maroon-900/80 backdrop-blur-sm animate-fade-in" />
          <div className="relative z-10 max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-ivory transition-colors hover:bg-gold hover:text-maroon-700"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[80vh] w-auto rounded-xl border border-gold/20 shadow-2xl"
            />
            <p className="mt-4 text-center text-sm text-ivory/80">
              <span className="rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon-700">
                {lightbox.category}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
<style>{`
  html {
    scroll-behavior: smooth;
  }

  #facilities,
  #gallery {
    scroll-margin-top: 110px;
  }
`}</style>