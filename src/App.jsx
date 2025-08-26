import { useState } from 'react'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null
}

function Square({ value, onClick, highlight, index }) {
  return (
    <button
      aria-label={`Square ${index + 1}${value ? `, ${value}` : ''}`}
      onClick={onClick}
      className={
        `flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 border text-3xl sm:text-4xl font-semibold select-none transition-colors ` +
        (highlight ? 'bg-green-200 border-green-400 text-green-700' : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800')
      }
    >
      {value}
    </button>
  )
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const result = calculateWinner(squares)
  const winner = result?.winner || null
  const winningLine = result?.line || []
  const isDraw = !winner && squares.every(Boolean)

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  function handleClick(i) {
    if (winner || squares[i]) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  function reset() {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow rounded-lg p-5 sm:p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Tic Tac Toe</h1>

          <div className="flex items-center justify-between mb-4">
            <div className={`text-lg font-medium ${winner ? 'text-green-700' : isDraw ? 'text-amber-700' : 'text-slate-700'}`}>{status}</div>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-3 gap-0 w-fit mx-auto rounded overflow-hidden">
            {squares.map((val, i) => (
              <Square
                key={i}
                index={i}
                value={val}
                onClick={() => handleClick(i)}
                highlight={winningLine.includes(i)}
              />
            ))}
          </div>

          <div className="mt-4 text-center text-sm text-slate-500">
            Play by tapping the squares. X goes first.
          </div>
        </div>
      </div>
    </div>
  )
}
