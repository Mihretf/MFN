const fs = require('fs');

let fileContent = fs.readFileSync('C:/Users/Hp/MFN/src/app/pages/Services.tsx', 'utf8');

if (!fileContent.includes('ImageWithFallback')) {
  fileContent = "import { ImageWithFallback } from '../components/figma/ImageWithFallback';\n" + fileContent;
}

const targetStr = 'className="md:w-2/5 h-64 md:h-auto relative overflow-hidden"';
const replaceStr = 'className="w-full md:w-2/5 h-64 md:h-72 flex-shrink-0 relative overflow-hidden bg-gray-100 dark:bg-gray-800"';

fileContent = fileContent.replace(targetStr, replaceStr);

fileContent = fileContent.replace(
  /<img\s+src=\{branch\.heroImage\}\s+alt=\{branch\.name\}\s+className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"\s*\/>/g,
  '<ImageWithFallback src={branch.heroImage || "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=1080"} alt={branch.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />'
);

fs.writeFileSync('C:/Users/Hp/MFN/src/app/pages/Services.tsx', fileContent, 'utf8');
console.log('Services.tsx updated successfully!');
