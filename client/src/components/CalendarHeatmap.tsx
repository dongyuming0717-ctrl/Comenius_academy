import { useState, useMemo } from 'react';

interface Props {
  checkInDates: string[];
  examDates?: string[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const BLUE = '#1e40af';
const GRAY_100 = '#f3f4f6';
const GRAY_300 = '#d1d5db';
const GRAY_400 = '#9ca3af';
const GRAY_500 = '#6b7280';
const GRAY_700 = '#374151';
const GRAY_900 = '#111827';

export function CalendarHeatmap({ checkInDates }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const checkInSet = useMemo(() => new Set(checkInDates), [checkInDates]);

  // Build calendar grid for the viewed month
  const weeks = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Which day of week does the 1st fall on? (0=Sun, 1=Mon, ..., 6=Sat)
    let startDow = firstDay.getDay();
    // Convert to Monday-based (0=Mon, 6=Sun)
    startDow = startDow === 0 ? 6 : startDow - 1;

    interface Cell {
      date: string; day: number; isCurrentMonth: boolean;
      isToday: boolean; isPast: boolean; checked: boolean;
    }
    const result: Cell[][] = [];
    let currentWeek: Cell[] = [];

    // Leading empty cells (previous month)
    for (let i = 0; i < startDow; i++) {
      const d = new Date(viewYear, viewMonth, 1 - startDow + i);
      currentWeek.push({
        date: d.toISOString().slice(0, 10),
        day: d.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isPast: d < today,
        checked: false,
      });
    }

    // Current month cells
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      const dateStr = d.toISOString().slice(0, 10);
      currentWeek.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isPast: d < today,
        checked: checkInSet.has(dateStr),
      });

      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }

    // Trailing empty cells (next month)
    if (currentWeek.length > 0) {
      const remaining = 7 - currentWeek.length;
      for (let i = 1; i <= remaining; i++) {
        const d = new Date(viewYear, viewMonth + 1, i);
        currentWeek.push({
          date: d.toISOString().slice(0, 10),
          day: d.getDate(),
          isCurrentMonth: false,
          isToday: false,
          isPast: false,
          checked: false,
        });
      }
      result.push(currentWeek);
    }

    return result;
  }, [viewYear, viewMonth, checkInSet, todayStr, today]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  const checkedCount = checkInDates.filter(d => {
    const [y, m] = d.split('-').map(Number);
    return y === viewYear && m === viewMonth + 1;
  }).length;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", userSelect: 'none', width: '100%' }}>
      {/* Header: month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={goToPrevMonth} style={{
          background: 'none', border: `1px solid ${GRAY_300}`, borderRadius: 8, cursor: 'pointer',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: GRAY_700, fontSize: 16,
        }}>
          &larr;
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: GRAY_900 }}>
            {MONTHS[viewMonth]} {viewYear}
          </div>
          <div style={{ fontSize: 12, color: GRAY_400, marginTop: 2 }}>
            {checkedCount} check-in{checkedCount !== 1 ? 's' : ''}
          </div>
        </div>
        <button onClick={goToNextMonth} style={{
          background: 'none', border: `1px solid ${GRAY_300}`, borderRadius: 8, cursor: 'pointer',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: GRAY_700, fontSize: 16,
        }}>
          &rarr;
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 3 }}>
        {DAY_HEADERS.map(dh => (
          <div key={dh} style={{
            height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 500, color: GRAY_400,
          }}>
            {dh}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
            {week.map((cell, di) => {
              let bg = 'transparent';
              let color = GRAY_400;
              let fontWeight = 400;
              let border = 'none';

              if (cell.isCurrentMonth && cell.checked) {
                bg = BLUE;
                color = '#fff';
                fontWeight = 600;
              } else if (cell.isToday) {
                color = BLUE;
                fontWeight = 700;
                border = `2px solid ${BLUE}`;
              } else if (cell.isCurrentMonth && cell.isPast) {
                color = GRAY_500;
              } else if (cell.isCurrentMonth) {
                color = GRAY_700;
              }

              const isSelected = selectedDate === cell.date;
              const isClickable = cell.isCurrentMonth && (cell.checked || cell.isPast);

              return (
                <div
                  key={di}
                  title={cell.isCurrentMonth ? `${cell.date}: ${cell.checked ? 'Checked in' : 'No check-in'}` : ''}
                  onClick={() => {
                    if (cell.isCurrentMonth) {
                      setSelectedDate(isSelected ? null : cell.date);
                    }
                  }}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight,
                    background: bg, color, border,
                    cursor: cell.isCurrentMonth ? 'pointer' : 'default',
                    transition: 'all 0.15s',
                    opacity: cell.isCurrentMonth ? 1 : 0,
                    pointerEvents: cell.isCurrentMonth ? 'auto' : 'none',
                    transform: isSelected ? 'scale(0.9)' : 'scale(1)',
                    boxShadow: isSelected ? '0 0 0 3px rgba(30,64,175,0.25)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (cell.isCurrentMonth) {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (cell.isCurrentMonth) {
                      (e.currentTarget as HTMLElement).style.transform = isSelected ? 'scale(0.9)' : 'scale(1)';
                      (e.currentTarget as HTMLElement).style.boxShadow = isSelected ? '0 0 0 3px rgba(30,64,175,0.25)' : 'none';
                    }
                  }}
                >
                  {cell.day}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 11, color: GRAY_500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: BLUE }} />
          Checked in
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, border: `2px solid ${BLUE}` }} />
          Today
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDate && checkInSet.has(selectedDate) && (
        <div style={{
          marginTop: 14, padding: '12px 16px', borderRadius: 10,
          background: '#eff6ff', border: `1px solid #bfdbfe`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: BLUE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, flexShrink: 0,
          }}>
            &#10003;
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: GRAY_900 }}>
              {formatDate(selectedDate)}
            </div>
            <div style={{ fontSize: 12, color: BLUE, marginTop: 1 }}>
              Checked in &#127775;
            </div>
          </div>
        </div>
      )}
      {selectedDate && !checkInSet.has(selectedDate) && new Date(selectedDate + 'T00:00:00') < today && (
        <div style={{
          marginTop: 14, padding: '12px 16px', borderRadius: 10,
          background: GRAY_100, border: `1px solid ${GRAY_300}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: GRAY_300,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: GRAY_500, fontSize: 16, flexShrink: 0,
          }}>
            &mdash;
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: GRAY_900 }}>
              {formatDate(selectedDate)}
            </div>
            <div style={{ fontSize: 12, color: GRAY_500, marginTop: 1 }}>
              No check-in
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
