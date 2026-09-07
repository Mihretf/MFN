const fs = require('fs');
try {
    let tpFile = 'src/app/providers/ThemeProvider.tsx';
    let tpContent = fs.readFileSync(tpFile, 'utf8');
    tpContent = tpContent.replace(/resolvedTheme === "dark" \? "dark" : "light"/g, '"light"');
    tpContent = tpContent.replace(/resolvedTheme === "dark" \? "#D4AF37" : "#AE8F05"/g, '"#AE8F05"');
    tpContent = tpContent.replace(/resolvedTheme === "dark" \? "#141312" : "#F2F0EB"/g, '"#F2F0EB"');
    tpContent = tpContent.replace(/resolvedTheme === "dark" \? "#1F1D1A" : "#FFFFF0"/g, '"#FFFFF0"');
    fs.writeFileSync(tpFile, tpContent);

    let headerFile = 'src/app/components/Header.tsx';
    let headerContent = fs.readFileSync(headerFile, 'utf8');
    const startIdx = headerContent.indexOf('<IconButton');
    const endIdx = headerContent.indexOf('</IconButton>', startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
        headerContent = headerContent.substring(0, startIdx) + headerContent.substring(endIdx + '</IconButton>'.length);
    }
    fs.writeFileSync(headerFile, headerContent);

    let indexFile = 'index.html';
    let indexContent = fs.readFileSync(indexFile, 'utf8');
    indexContent = indexContent.replace(
      '<title>Church Website Design Specification</title>',
      `<meta name="description" content="Mission for Nation Church - Apostle Dr. Zelalem Getachew. áŠ¨á‹áŠ• à‰‹á‰µá‹á‹• á‹“áˆˆá† áŠ á‰ˆáŒ† à‰£à‰‹àŠ­àˆ¶àˆ·á‹¨áŠ–" />
      <meta name="keywords" content="mfni.church, missionfornationchurch, zelalem getachew, apostle zelalem, áŠ¨á‹áŠ• à‰‹á‹µá‹á‹• á‹“áˆˆá† áŠ á‰ˆáŒ† à‰ƒà‰‹àŠ­àˆ¶à‰·á‹¨áŠ–" />
      <title>Mission for Nation International</title>`
    );
    fs.writeFileSync(indexFile, indexContent);
    console.log("Tasks 2 and 3 applied.");
} catch(e) {
    console.error(e);
}