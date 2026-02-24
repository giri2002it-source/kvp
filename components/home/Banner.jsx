import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Grace in Every Thread, Story in Every Drape",
    subtitle:
      "Unfold the elegance of handwoven sarees crafted with legacy, styled for today’s woman",
    btnText: "Explore Now",
    img: "/assets/images/saree2.png",
  },
  {
    title: "Elegance Meets Craftsmanship",
    subtitle: "Handloom sarees designed for comfort and grandeur",
    btnText: "Explore Now",
    img: "/assets/images/saree3.png",
  },
  {
    title: "Celebrate the Art of Weaving",
    subtitle: "Premium drapes that define timeless tradition",
    btnText: "Explore Now",
    img: "/assets/images/saree2.png",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Auto Slide (Every 4s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (i) => setCurrent(i);

  return (
    <div
      style={{
        width: "100%",
        minHeight: isMobile ? "600px" : "480px",
        position: "relative",
        overflow: "hidden",
        background: "#fdf6f0",
        boxShadow:"0px 4px 50px 5px #CEB666 inset",
        color: "#222",

      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            opacity: index === current ? 1 : 0,
            pointerEvents: index === current ? "auto" : "none",
            transition: "opacity 0.7s ease-in-out",
            padding: isMobile ? "20px" : "40px 60px",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between",
          }}
        >
          {/* MOBILE IMAGE FIRST */}
          {isMobile && (
            <div style={{height:"80%"}}>
            <img
              src={slide.img}
              alt="Banner"
              style={{
                width: "90%",
                height: "100%",
                
                alignSelf: "center",
              }}
            /></div> 
          )}

          {/* LEFT TEXT */}
          <div style={{ width: isMobile ? "100%" : "50%" }}>
            <h1
              style={{
                fontSize: isMobile ? "26px" : "42px",
                marginBottom: "15px",
                lineHeight: isMobile ? "32px" : "50px",
              }}
            >
              {slide.title}
            </h1>

            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                marginBottom: "20px",
                lineHeight: "22px",
              }}
            >
              {slide.subtitle}
            </p>

            <button
              style={{
                backgroundColor: "#a81d24",
                border: "none",
                color: "#fff",
                padding: isMobile ? "8px 16px" : "10px 22px",
                fontSize: isMobile ? "13px" : "14px",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: isMobile ? "10px" : "0",
              }}
            >
              {slide.btnText}
            </button>
          </div>

          {/* DESKTOP IMAGE */}
          {!isMobile && (
            <div style={{ width: "50%", height: "100%", textAlign: "right" }}>
              <img
                src={slide.img}
                alt="Banner"
                style={{
                  width: "80%",
                  height: "auto",
                }}
              />
            </div>
          )}
        </div>
      ))}

      {/* DOTS */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "10px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === current ? "12px" : "8px",
              height: index === current ? "12px" : "8px",
              background: index === current ? "#a81d24" : "#ccc",
              borderRadius: "50%",
              cursor: "pointer",
              transition: "0.3s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
