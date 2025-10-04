import React, { useEffect, useState } from 'react'
import { FiClock, FiX } from 'react-icons/fi'

export default function DemoCalculator() {
  const [value, setValue] = useState('0')
  const [overwrite, setOverwrite] = useState(true)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const inputDigit = (digit) => {
    if (overwrite) {
      setValue(digit === '.' ? '0.' : String(digit))
      setOverwrite(false)
      return
    }
    if (digit === '.' && value.includes('.')) return
    setValue(prev => (prev === '0' && digit !== '.' ? String(digit) : prev + digit))
  }

  const clear = () => { setValue('0'); setOverwrite(true) }
  const negate = () => setValue(prev => String(Number(prev) * -1))
  const percent = () => setValue(prev => String(Number(prev) / 100))

  const applyOp = (op) => {
    if (overwrite && /[+\-*/]$/.test(value)) return
    setValue(prev => prev + op)
    setOverwrite(false)
  }

  const calculate = () => {
    try {
      const expr = value.replace(/[^0-9.+\-*/()]/g, '')
      const sanitized = expr.replace(/([+\-*/])$/,'')
      // eslint-disable-next-line no-new-func
      const res = Function(`return (${sanitized})`)()
      const calculation = `${value} = ${res}`
      setHistory(prev => [calculation, ...prev.slice(0, 9)])
      setValue(String(res))
      setOverwrite(true)
    } catch (e) {
      setValue('Error')
      setOverwrite(true)
    }
  }

  useEffect(()=>{
    const handleKey = (e) => {
      const k = e.key
      if ((/^[0-9]$/).test(k)) inputDigit(k)
      if (k === '.') inputDigit('.')
      if (k === 'Enter' || k === '=') calculate()
      if (k === 'Backspace') setValue(prev => (prev.length>1? prev.slice(0,-1) : '0'))
      if (['+','-','*','/'].includes(k)) applyOp(k === '*' ? '×' : k)
    }
    window.addEventListener('keydown', handleKey)
    return ()=> window.removeEventListener('keydown', handleKey)
  }, [value, overwrite])

  const buttons = [
    ['C','+/-','%','/'],
    ['7','8','9','×'],
    ['4','5','6','-'],
    ['1','2','3','+'],
    ['0','.','=']
  ]

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg ${showHistory ? 'bg-gradient-to-r from-indigo-500 to-pink-500' : 'bg-white/10'} text-white`}
            aria-label="Toggle history"
          >
            <FiClock size={20} />
          </button>
          <div className="text-right text-3xl font-mono font-semibold break-words flex-1 px-4" aria-live="polite">{value}</div>
        </div>

        {showHistory && (
          <div className="mb-4 rounded-lg bg-black/20 p-3 max-h-40 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/70">History</span>
              <button 
                onClick={() => setHistory([])}
                className="text-white/50 hover:text-white/80 p-1"
                aria-label="Clear history"
              >
                <FiX size={16} />
              </button>
            </div>
            {history.length === 0 ? (
              <div className="text-white/50 text-sm text-center py-2">No history yet</div>
            ) : (
              <div className="space-y-1">
                {history.map((item, idx) => (
                  <div key={idx} className="text-sm text-white/80 font-mono p-2 rounded hover:bg-white/5 cursor-pointer"
                       onClick={() => {setValue(item.split('=')[1].trim()); setOverwrite(true);}}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}>
          {buttons.flat().map((b, i) => {
            const isOp = ['+','-','×','/','='].includes(b)
            const colSpan = b === '0' ? 2 : 1
            return (
              <button
                key={i}
                type="button"
                onClick={()=>{
                  if (b === 'C') return clear()
                  if (b === '+/-') return negate()
                  if (b === '%') return percent()
                  if (b === '=') return calculate()
                  if (['+','-','×','/'].includes(b)) return applyOp(b === '×' ? '*' : b)
                  inputDigit(b)
                }}
                aria-label={`Calculator button ${b}`}
                className={`rounded-lg py-3 px-2 text-lg font-semibold ${isOp ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white' : 'bg-white/3 text-white'}`}
                style={{ gridColumn: `span ${colSpan}` }}
              >
                {b}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
