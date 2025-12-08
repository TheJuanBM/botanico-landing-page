import { useState, useRef, useEffect } from 'react';

export default function GuestSelector() {
  const [guests, setGuests] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const minGuests = 1;
  const maxGuests = 30;
  const personalizedThreshold = 10; // Más de este número requiere atención personalizada

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const increment = () => {
    if (guests < maxGuests) setGuests(guests + 1);
  };

  const decrement = () => {
    if (guests > minGuests) setGuests(guests - 1);
  };

  const guestText = guests === 1 ? '1 persona' : `${guests} personas`;

  return (
    <div className="w-full relative" ref={containerRef}>
      <label htmlFor="guest-selector" className="block text-sm font-medium text-white mb-2">
        Personas
      </label>
      <button
        type="button"
        id="guest-selector"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Seleccionar número de personas, actualmente ${guestText}`}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-cafe-claro transition-all"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 ${guests > personalizedThreshold ? 'text-amber-500' : 'text-verde-oliva'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-negro-suave font-medium">{guestText}</span>
            {guests > personalizedThreshold && (
              <span className="text-xs text-amber-600">Atención personalizada</span>
            )}
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-negro-suave font-medium">Huéspedes</p>
                  <p className="text-sm text-gray-500">
                    {guests > personalizedThreshold
                      ? 'Atención personalizada'
                      : `Hasta ${personalizedThreshold} personas online`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    decrement();
                  }}
                  disabled={guests <= minGuests}
                  aria-label="Reducir número de personas"
                  className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-negro-suave hover:border-verde-oliva hover:text-verde-oliva transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-negro-suave"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span
                  className="w-8 text-center text-lg font-semibold text-negro-suave"
                  aria-live="polite"
                >
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    increment();
                  }}
                  disabled={guests >= maxGuests}
                  aria-label="Aumentar número de personas"
                  className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-negro-suave hover:border-verde-oliva hover:text-verde-oliva transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-negro-suave"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Mensaje de advertencia para grupos grandes */}
          {guests > personalizedThreshold && (
            <div className="px-4 pb-3">
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <svg
                  className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-xs">
                  <p className="font-semibold text-amber-800">Grupo grande</p>
                  <p className="text-amber-700">
                    Para +10 personas, recibirás atención personalizada con respuesta en menos de 30
                    min.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 p-3 bg-gray-50">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 text-sm font-medium text-verde-oliva hover:text-negro-suave transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* Hidden input for form */}
      <input type="hidden" id="guests" name="guests" value={guests} />
    </div>
  );
}
