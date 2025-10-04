import React, { useEffect, useState } from 'react'

export default function DemoCalculator() {
  const [value, setValue] = useState('0')
  const [overwrite, setOverwrite] = useState(true)

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
      if (['+','-','*','/'].includes(k)) applyOp(k)
    }
    window.addEventListener('keydown', handleKey)
    return ()=> window.removeEventListener('keydown', handleKey)
  }, [value, overwrite])

  const buttons = [
    ['C','+/-','%','/'],
    ['7','8','9','*'],
    ['4','5','6','-'],
    ['1','2','3','+'],
    ['0','.','=']
  ]

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-4 text-right text-3xl font-mono font-semibold break-words" aria-live="polite">{value}</div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}>
          {buttons.flat().map((b, i) => {
            const isOp = ['+','-','*','/','='].includes(b)
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
                  if (['+','-','*','/'].includes(b)) return applyOp(b)
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
