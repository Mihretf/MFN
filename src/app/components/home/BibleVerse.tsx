import { BookOpen } from "lucide-react";

export default function BibleVerse() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <blockquote className="text-2xl md:text-3xl text-gray-800 mb-6 italic leading-relaxed">
          "For God so loved the world that he gave his one and only Son, that
          whoever believes in him shall not perish but have eternal life."
        </blockquote>
        <cite className="text-lg text-gray-600">— John 3:16</cite>
      </div>
    </section>
  );
}
