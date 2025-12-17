import { DateRangePicker, type DateRangePickerProps } from '@heroui/date-picker';
import { HeroUIProvider } from '@heroui/system';
import { getLocalTimeZone, today } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import { useState, useEffect } from 'react';

type DateRangeValue = DateRangePickerProps['value'];
type DateValueType = NonNullable<DateRangeValue>['start'];

function formatDate(date: DateValueType | undefined): string {
  if (!date) return '';

  const day = date.day.toString().padStart(2, '0');
  const month = date.month.toString().padStart(2, '0');
  const year = date.year;

  return `${day}/${month}/${year}`;
}

function calculateNights(start: DateValueType | undefined, end: DateValueType | undefined): number {
  if (!start || !end) return 0;

  const startDate = new Date(start.year, start.month - 1, start.day);
  const endDate = new Date(end.year, end.month - 1, end.day);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

function useIsMobile(breakpoint = 595) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  if (!mounted) return false;
  return isMobile;
}

export default function StayDatePicker() {
  const [value, setValue] = useState<DateRangeValue>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [minDate, setMinDate] = useState<ReturnType<typeof today> | undefined>(undefined);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMinDate(today(getLocalTimeZone()));
  }, []);

  const startText = value?.start ? formatDate(value.start) : 'Entrada';
  const endText = value?.end ? formatDate(value.end) : 'Salida';
  const totalNights = calculateNights(value?.start, value?.end);
  const nightsText = totalNights === 1 ? '1 noche' : `${totalNights} noches`;
  const visibleMonths = isMobile ? 1 : 2;

  return (
    <>
      <HeroUIProvider locale="es-ES">
        <I18nProvider locale="es-ES">
          <div className="w-full">
            <div
              role="button"
              tabIndex={0}
              className="block text-sm w-fit font-medium text-white mb-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
            >
              <span>Estadía</span>
              {totalNights > 0 && (
                <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full font-medium ml-1">
                  {nightsText}
                </span>
              )}
            </div>
            <div className="relative">
              <div
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-cafe-claro transition-all relative z-10"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex items-center gap-3 flex-1 justify-evenly">
                  <span className="text-negro-suave font-medium">{startText}</span>
                  <span className="text-gray-300">→</span>
                  <span className="text-negro-suave font-medium">{endText}</span>
                </div>
                <svg
                  className="w-5 h-5 text-verde-oliva"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <DateRangePicker
                  aria-label="Seleccionar fechas de estadía"
                  visibleMonths={visibleMonths}
                  pageBehavior="single"
                  minValue={minDate}
                  value={value}
                  onChange={setValue}
                  showMonthAndYearPickers
                  isOpen={isOpen}
                  onOpenChange={setIsOpen}
                  classNames={{
                    base: 'w-full h-full opacity-0 cursor-pointer',
                    inputWrapper: 'h-full',
                    popoverContent: 'bg-white shadow-xl rounded-xl border border-gray-100',
                    calendar: 'bg-white',
                    calendarContent: 'bg-white',
                  }}
                  popoverProps={{
                    placement: 'bottom-start',
                    offset: 8,
                    crossOffset: -13,
                    shouldFlip: true,
                    containerPadding: 16,
                  }}
                  calendarProps={{
                    classNames: {
                      base: 'bg-white shadow-none',
                      headerWrapper: 'bg-gray-50 rounded-lg py-2',
                      header: 'text-negro-suave',
                      gridHeader: 'bg-white',
                      cell: 'text-negro-suave',
                      cellButton: ['transition-all duration-200'],
                    },
                  }}
                />
              </div>
            </div>
            <input
              type="hidden"
              id="check_in"
              name="check_in"
              value={value?.start?.toString() || ''}
            />
            <input
              type="hidden"
              id="check_out"
              name="check_out"
              value={value?.end?.toString() || ''}
            />
          </div>
        </I18nProvider>
      </HeroUIProvider>
    </>
  );
}
