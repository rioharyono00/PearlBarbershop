import { useState, useEffect, useRef } from "react";

const LOGO_SRC = "/mnt/user-data/uploads/1776146306597_image.png";

const SERVICES = [
  { name: "Haircut", desc: "Potongan presisi sesuai karakter wajah", price: "75K", duration: "45 min", icon: "✂️" },
  { name: "Beard Trim", desc: "Cukur & rapikan jenggot dengan detail", price: "50K", duration: "30 min", icon: "🪒" },
  { name: "Hair + Beard", desc: "Paket lengkap potong rambut & jenggot", price: "110K", duration: "60 min", icon: "💈" },
  { name: "Hair Wash", desc: "Cuci rambut dengan pijat kepala relaksasi", price: "30K", duration: "20 min", icon: "🧴" },
  { name: "Hot Towel Shave", desc: "Classic shave dengan handuk panas", price: "60K", duration: "35 min", icon: "🔥" },
  { name: "Kids Cut", desc: "Potongan rapi untuk anak-anak", price: "50K", duration: "30 min", icon: "⭐" },
];

const REVIEWS = [
  { name: "Krismalia Meisca", text: "Barberman-nya so talented, selalu buat pacar aku keliatan makin charming setelah potong rambut. Recommended!", rating: 5, time: "5 bulan lalu" },
  { name: "Євгеній Шабл", text: "Really good haircut! Did everything like I want, also good beard shaving! Recommend this place!", rating: 5, time: "5 bulan lalu" },
  { name: "Pelanggan Setia", text: "Langganan suami, hasil selalu oke. Barbershop terbaik di Denpasar Barat!", rating: 5, time: "3 bulan lalu" },
];

const GALLERY = [
  { style: "Classic Pompadour", gradient: "linear-gradient(135deg, #2a1f1a, #4a3728)" },
  { style: "Textured Crop", gradient: "linear-gradient(135deg, #1a1f2a, #283748)" },
  { style: "Skin Fade", gradient: "linear-gradient(135deg, #1a2a1f, #284a37)" },
  { style: "Slick Back", gradient: "linear-gradient(135deg, #2a1a2a, #483748)" },
  { style: "Buzz Cut", gradient: "linear-gradient(135deg, #2a2a1a, #484728)" },
  { style: "Beard Styling", gradient: "linear-gradient(135deg, #1a2a2a, #284847)" },
];

function StarRating({ count }) {
  return (
    <span style={{ color: "#c9a96e", letterSpacing: 2 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease`,
      ...style,
    }}>{children}</div>
  );
}

export default function PearlBarber() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "gallery", "reviews", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 300) setActiveSection(id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const NAV = ["home", "services", "gallery", "reviews", "contact"];

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      background: "#0d0d0d",
      color: "#e8e0d4",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Bebas+Neue&family=Outfit:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        .nav-link {
          color: #a09880;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.3s;
          padding: 4px 0;
          border-bottom: 1px solid transparent;
        }
        .nav-link:hover, .nav-link.active {
          color: #c9a96e;
          border-bottom-color: #c9a96e;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #c9a96e, #a8873e);
          color: #0d0d0d;
          border: none;
          padding: 16px 40px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201,169,110,0.3);
        }
        
        .btn-outline {
          background: transparent;
          color: #c9a96e;
          border: 1px solid #c9a96e;
          padding: 14px 36px;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s;
        }
        .btn-outline:hover {
          background: #c9a96e;
          color: #0d0d0d;
        }

        .service-card {
          background: linear-gradient(145deg, #161616, #111);
          border: 1px solid #222;
          padding: 32px 28px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #c9a96e, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .service-card:hover {
          border-color: #333;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .service-card:hover::before { opacity: 1; }
        
        .gallery-item {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          cursor: pointer;
        }
        .gallery-item .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,13,13,0.6);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .gallery-item:hover .overlay { opacity: 1; }

        .review-card {
          background: #111;
          border: 1px solid #1a1a1a;
          padding: 32px;
          border-left: 2px solid #c9a96e;
        }

        .divider {
          width: 60px;
          height: 1px;
          background: #c9a96e;
          margin: 0 auto;
        }
        
        .float-tag {
          display: inline-block;
          background: rgba(201,169,110,0.1);
          border: 1px solid rgba(201,169,110,0.2);
          padding: 6px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: #c9a96e;
          text-transform: uppercase;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .hero-title {
          animation: fadeInUp 1.2s ease forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        .hero-tagline {
          animation: fadeInUp 1.2s ease forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }
        .hero-cta {
          animation: fadeInUp 1.2s ease forwards;
          animation-delay: 0.9s;
          opacity: 0;
        }
        .hero-badge {
          animation: scaleIn 0.8s ease forwards;
          animation-delay: 1.2s;
          opacity: 0;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #c9a96e; }
      `}</style>

      <div className="noise-overlay" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: "rgba(13,13,13,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,169,110,0.1)",
        animation: "slideDown 0.6s ease",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "#c9a96e" }}>Pearl</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 9, letterSpacing: 4, color: "#666", textTransform: "uppercase" }}>Barber Shop</span>
          </div>

          <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV.map(s => (
              <span key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
                {s === "home" ? "Beranda" : s === "services" ? "Layanan" : s === "gallery" ? "Galeri" : s === "reviews" ? "Ulasan" : "Kontak"}
              </span>
            ))}
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 11 }}
              onClick={() => window.open("https://wa.me/6281238012282", "_blank")}>
              Book Now
            </button>
          </div>

          <div className="mobile-toggle" style={{
            display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 8
          }} onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ width: 24, height: 1.5, background: "#c9a96e", transition: "0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ width: 24, height: 1.5, background: "#c9a96e", transition: "0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 24, height: 1.5, background: "#c9a96e", transition: "0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu" style={{
            padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 20,
            borderTop: "1px solid #1a1a1a",
          }}>
            {NAV.map(s => (
              <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ fontSize: 13 }}>
                {s === "home" ? "Beranda" : s === "services" ? "Layanan" : s === "gallery" ? "Galeri" : s === "reviews" ? "Ulasan" : "Kontak"}
              </span>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
        background: "radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(201,169,110,0.03) 0%, transparent 50%), #0d0d0d",
        overflow: "hidden",
      }}>
        {/* decorative lines */}
        <div style={{ position: "absolute", top: "20%", left: 60, width: 1, height: "30%", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.15), transparent)" }} />
        <div style={{ position: "absolute", top: "25%", right: 60, width: 1, height: "25%", background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.1), transparent)" }} />

        <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
          <div className="hero-badge" style={{ marginBottom: 40 }}>
            <span className="float-tag">Est. Bali</span>
          </div>

          <h1 className="hero-title" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 10vw, 100px)",
            fontWeight: 300,
            lineHeight: 0.95,
            color: "#e8e0d4",
            marginBottom: 8,
          }}>
            Pearl
          </h1>
          <p className="hero-title" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(14px, 3vw, 20px)",
            letterSpacing: 12,
            color: "#c9a96e",
            marginBottom: 32,
            animationDelay: "0.5s",
          }}>
            BARBER SHOP
          </p>

          <p className="hero-tagline" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 3vw, 28px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#a09880",
            marginBottom: 48,
          }}>
            Keep It Handsome
          </p>

          <div className="hero-cta" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => window.open("https://wa.me/6281238012282", "_blank")}>
              Book Appointment
            </button>
            <button className="btn-outline" onClick={() => scrollTo("services")}>
              Lihat Layanan
            </button>
          </div>

          <div className="hero-badge" style={{
            marginTop: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
            fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#666",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#c9a96e", fontSize: 16 }}>★</span> 4.4 Rating
            </span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#333" }} />
            <span>200+ Ulasan</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#333" }} />
            <span>Buka s/d 22:00</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="float-tag" style={{ marginBottom: 20, display: "inline-block" }}>Our Services</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300, marginTop: 20, marginBottom: 16,
            }}>
              Layanan Kami
            </h2>
            <div className="divider" />
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="service-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <span style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 28, color: "#c9a96e",
                  }}>
                    {s.price}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22, fontWeight: 500, marginBottom: 8,
                }}>{s.name}</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13, color: "#777", lineHeight: 1.6, marginBottom: 16,
                }}>{s.desc}</p>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11, color: "#555", letterSpacing: 1,
                }}>⏱ {s.duration}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p style={{
            textAlign: "center", marginTop: 40,
            fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#555",
            fontStyle: "italic",
          }}>
            * Harga bersifat estimasi, hubungi kami untuk informasi terbaru
          </p>
        </FadeIn>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{
        padding: "120px 24px",
        background: "linear-gradient(180deg, rgba(201,169,110,0.03), transparent, rgba(201,169,110,0.03))",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="float-tag" style={{ marginBottom: 20, display: "inline-block" }}>Portfolio</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300, marginTop: 20, marginBottom: 16,
              }}>
                Galeri Gaya
              </h2>
              <div className="divider" />
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}>
            {GALLERY.map((g, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="gallery-item" style={{
                  background: g.gradient,
                  borderRadius: 4,
                  border: "1px solid #1a1a1a",
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 8,
                  }}>
                    <span style={{ fontSize: 32, opacity: 0.3 }}>✂️</span>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 11, color: "#888", letterSpacing: 2, textTransform: "uppercase",
                    }}>{g.style}</span>
                  </div>
                  <div className="overlay">
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18, fontStyle: "italic", color: "#c9a96e",
                    }}>Lihat Detail</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p style={{
              textAlign: "center", marginTop: 40,
              fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#555",
            }}>
              Upload foto hasil potongan Anda untuk ditampilkan di galeri
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "120px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="float-tag" style={{ marginBottom: 20, display: "inline-block" }}>Testimonials</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 300, marginTop: 20, marginBottom: 12,
            }}>
              Kata Mereka
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
              <StarRating count={4} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888" }}>
                4.4 dari 200+ ulasan Google
              </span>
            </div>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="review-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18, fontWeight: 600, marginBottom: 4,
                    }}>{r.name}</p>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555" }}>{r.time}</span>
                  </div>
                  <StarRating count={r.rating} />
                </div>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14, color: "#999", lineHeight: 1.8, fontStyle: "italic",
                }}>
                  "{r.text}"
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="contact" style={{
        padding: "120px 24px 60px",
        background: "linear-gradient(180deg, transparent, rgba(201,169,110,0.05))",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span className="float-tag" style={{ marginBottom: 20, display: "inline-block" }}>Visit Us</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300, marginTop: 20, marginBottom: 16,
              }}>
                Kunjungi Kami
              </h2>
              <div className="divider" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 40,
              textAlign: "center",
              marginBottom: 60,
            }}>
              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#c9a96e", letterSpacing: 3, marginBottom: 16 }}>
                  ALAMAT
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", lineHeight: 1.8 }}>
                  Jl. Gunung Sanghyang No.278<br />
                  Kerobokan Kaja, Kec. Kuta Utara<br />
                  Kabupaten Badung, Bali 80361
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555",
                  marginTop: 12, fontStyle: "italic",
                }}>
                  ⚠️ Parkir terbatas untuk mobil, disarankan motor/sepeda
                </p>
              </div>

              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#c9a96e", letterSpacing: 3, marginBottom: 16 }}>
                  JAM BUKA
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", lineHeight: 2 }}>
                  Senin – Minggu<br />
                  10:00 – 22:00 WITA
                </p>
              </div>

              <div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#c9a96e", letterSpacing: 3, marginBottom: 16 }}>
                  HUBUNGI
                </p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#888", lineHeight: 2 }}>
                  📞 0812-3801-282
                </p>
                <button className="btn-primary" style={{ marginTop: 16, padding: "12px 32px" }}
                  onClick={() => window.open("https://wa.me/6281238012282", "_blank")}>
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </FadeIn>

          {/* MAP EMBED PLACEHOLDER */}
          <FadeIn delay={0.2}>
            <div style={{
              width: "100%", height: 280,
              background: "linear-gradient(135deg, #161616, #111)",
              border: "1px solid #1a1a1a",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 12,
              borderRadius: 4,
              marginBottom: 80,
            }}>
              <span style={{ fontSize: 28 }}>📍</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#555", letterSpacing: 2 }}>
                GOOGLE MAPS EMBED
              </span>
              <a href="https://maps.google.com/?q=-8.6546,115.1686" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#c9a96e", textDecoration: "none" }}>
                Buka di Google Maps →
              </a>
            </div>
          </FadeIn>

          {/* FOOTER */}
          <div style={{
            borderTop: "1px solid #1a1a1a",
            paddingTop: 40,
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32, fontWeight: 300, color: "#c9a96e", marginBottom: 8,
            }}>Pearl</p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 10, letterSpacing: 4, color: "#444", marginBottom: 20,
            }}>BARBER SHOP · KEEP IT HANDSOME</p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 11, color: "#333",
            }}>
              © 2026 Pearl Barber Shop. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
