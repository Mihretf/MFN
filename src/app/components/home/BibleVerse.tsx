import { Youtube } from "lucide-react";

export default function YoutubeSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between max-w-4xl mx-auto">
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1a3c34]/20 to-[#d4af37]/20 rounded-full blur-2xl transform scale-100"></div>
            <img 
              src="https://res.cloudinary.com/dj3wxiznw/image/upload/v1775807335/IMG_20250913_155605_690-removebg-preview_1_ieovqf.png" 
              onError={(e) => {
                e.currentTarget.src = "/IMG_20250913_155605_690-removebg-preview (1).png";
              }}
              alt="7 Spirit TV Logo" 
              className="relative z-10 w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-xl"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-5">
            <div className="inline-flex items-center justify-center space-x-2 text-[#ff0000] bg-[#ff0000]/10 px-4 py-2 rounded-full">
              <Youtube className="w-5 h-5 fill-current" />
              <span className="font-bold tracking-wider text-xs uppercase">Official YouTube Channel</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors tracking-tight">
              7 Spirits Tv
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              7 Spirits Tv is one of Mission for nation International Ministry's active department to reach the vision for millions of people with visionary and founder Apostle Zelalem Getachew.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a 
                href="https://www.youtube.com/@7spirits_tv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold rounded-lg transition-all shadow-md shadow-[#ff0000]/20 hover:scale-105"
              >
                <Youtube className="w-6 h-6 mr-3" />
                Subscribe Now
              </a>
              <a 
                href="https://www.youtube.com/@7spirits_tv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white text-gray-900 dark:text-white font-bold rounded-lg transition-all hover:scale-105"
              >
                Watch Latest Videos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
