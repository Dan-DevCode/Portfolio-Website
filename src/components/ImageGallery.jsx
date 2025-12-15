import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function ImageGallery({ images, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goToNext, goToPrevious, onClose])

  if (!images || images.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            {/* Image Container - Almost Full Screen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[95vw] h-[95vh] flex items-center justify-center"
            >
              {/* Close Button - Top Right */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all focus-ring shadow-lg"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                </AnimatePresence>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 p-4 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all focus-ring z-10 shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 p-4 rounded-full bg-black/70 hover:bg-black/90 text-white transition-all focus-ring z-10 shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </button>
                  </>
                )}

                {/* Image Counter - Bottom Center */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-white text-sm z-10 shadow-lg">
                    {currentIndex + 1} / {images.length}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ImageGallery


