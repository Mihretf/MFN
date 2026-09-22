import re

with open('src/app/pages/Services.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove dark gradient overlay on church card images
content = content.replace(
    '<div className="absolute inset-0 bg-gradient-to-t from-[#1a3c34]/80 to-transparent" />',
    ''
)

# 2. Wrap location display so empty locations hide the pin icon too
old_loc = (
    '                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 transition-colors">\n'
    '                                      <MapPin className="w-4 h-4 mr-2 text-[#d4af37]" />\n'
    '                                      <span>{branch.location}</span>\n'
    '                                    </div>'
)
new_loc = (
    '                                    {branch.location && (\n'
    '                                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 transition-colors">\n'
    '                                      <MapPin className="w-4 h-4 mr-2 text-[#d4af37]" />\n'
    '                                      <span>{branch.location}</span>\n'
    '                                    </div>\n'
    '                                    )}'
)

if old_loc in content:
    content = content.replace(old_loc, new_loc)
    print('Location block patched.')
else:
    print('Location block NOT found - checking variations...')
    # Try to find a close match
    idx = content.find('branch.location}</span>')
    if idx != -1:
        print('Found branch.location close to index', idx)
        print(content[max(0,idx-300):idx+100])

with open('src/app/pages/Services.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Services.tsx patched. Dark gradient remaining:', content.count('from-[#1a3c34]/80'))
