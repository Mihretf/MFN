import React, { useEffect, useRef, useState } from "react";

interface SlideUpCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const SlideUpCounter: React.FC<SlideUpCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellHeight, setCellHeight] = useState<number>(0);

  const valueString = value.toString();
  const digits = valueString.split("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const computed = window.getComputedStyle(containerRef.current);
      const fontSize = parseFloat(computed.fontSize);
      // Determine line height
      const rawLineHeight = computed.lineHeight;
      const height = rawLineHeight === "normal" ? fontSize * 1.2 : parseFloat(rawLineHeight);
      setCellHeight(height || fontSize * 1.2);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center font-serif font-bold text-sacred-gold ${className}`}
      style={{ lineHeight: cellHeight ? `${cellHeight}px` : "1.2em" }}
    >
      {prefix && <span className="mr-0.5">{prefix}</span>}

      <div className="inline-flex items-center overflow-hidden" style={{ height: cellHeight ? `${cellHeight}px` : "1.2em" }}>
        {digits.map((digit, index) => {
          const numericDigit = parseInt(digit, 10);
          const isNumber = !isNaN(numericDigit);

          if (!isNumber) {
            return (
              <span key={index} className="inline-block">
                {digit}
              </span>
            );
          }

          // Delay stagger calculation from right to left
          const staggerDelay = (digits.length - 1 - index) * 0.12;

          return (
            <div
              key={index}
              className="counter-cell relative inline-block overflow-hidden"
              style={{
                height: cellHeight ? `${cellHeight}px` : "1.2em",
                lineHeight: cellHeight ? `${cellHeight}px` : "1.2em",
              }}
            >
              <div
                className="counter-strip flex flex-col transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] duration-1000"
                style={{
                  transform: isVisible ? `translateY(-${numericDigit * 10}%)` : "translateY(0%)",
                  transitionDelay: `${staggerDelay}s`,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <span
                    key={num}
                    className="flex items-center justify-center font-serif text-sacred-gold"
                    style={{
                      height: cellHeight ? `${cellHeight}px` : "1.2em",
                      lineHeight: cellHeight ? `${cellHeight}px` : "1.2em",
                    }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {suffix && <span className="ml-0.5">{suffix}</span>}
    </div>
  );
};
