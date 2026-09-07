import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // Ensure object-position favors upper portion (heads & faces) if object-fit: cover is used
  const hasObjectPosition = className?.includes('object-') && (
    className.includes('object-top') || 
    className.includes('object-bottom') || 
    className.includes('object-center') || 
    className.includes('object-[')
  )

  const enhancedClassName = `${className ?? ''} ${!hasObjectPosition ? 'object-top' : ''}`.trim()

  const defaultStyle: React.CSSProperties = {
    objectPosition: style?.objectPosition ?? 'center 15%',
    ...style,
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 dark:bg-gray-800 text-center align-middle ${enhancedClassName}`}
      style={defaultStyle}
    >
      <div className="flex items-center justify-center w-full h-full p-2">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} className="w-8 h-8 opacity-40" />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={enhancedClassName}
      style={defaultStyle}
      {...rest}
      onError={handleError}
    />
  )
}
