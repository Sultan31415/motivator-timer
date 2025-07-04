import { useState, useEffect } from 'react';
import './Home.css';

const MOTIVATIONAL_PHRASES = [
    'Ты молодец!',
    'Отличная работа!',
    'Ты сделал это!',
    'Продолжай в том же духе!',
    'Гордимся тобой!',
    'Ты на верном пути!',
    'Всё получится!',
    'Ты справился лучше всех!',
    'Великолепно!',
    'Супер результат!'
];

export default function Home() {
    const [name, setName] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [phrase, setPhrase] = useState('');
    const [duration, setDuration] = useState(10);

    useEffect(() => {
        let timer;
        if (isStarted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsStarted(false);
            const randomPhrase = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
            setPhrase(randomPhrase);
        }
        return () => clearInterval(timer);
    }, [isStarted, timeLeft]);

    const handleStart = () => {
        setIsStarted(true);
        setTimeLeft(duration);
        setPhrase('');
    };

    const handleReset = () => {
        setIsStarted(false);
        setTimeLeft(duration);
        setName('');
        setPhrase('');
    };

    const handleDurationChange = (e) => {
        const value = Number(e.target.value);
        setDuration(value);
        setTimeLeft(value);
    };

    return (
        <div className='home-box'>
            <label htmlFor="nameInput" style={{ color: 'black', padding: '10px' }}>
                Enter your name:
            </label>
            <input
                id="nameInput"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isStarted}
            />
            <label htmlFor="durationSelect" style={{ color: 'black', padding: '10px', marginTop: '10px' }}>
                Выберите длительность таймера:
            </label>
            <select
                id="durationSelect"
                value={duration}
                onChange={handleDurationChange}
                disabled={isStarted}
                style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '8px' }}
            >
                <option value={10}>10 секунд</option>
                <option value={20}>20 секунд</option>
                <option value={30}>30 секунд</option>
            </select>
            <button
                type='button'
                style={{ marginLeft: '10px' }}
                onClick={handleStart}
                disabled={isStarted || !name}
            >
                Start
            </button>
            <button
                type='button'
                style={{ marginLeft: '10px', background: '#e74c3c', color: '#fff' }}
                onClick={handleReset}
            >
                Сброс
            </button>
            {isStarted || timeLeft !== duration ? (
                <div className="timer-display">
                    {timeLeft > 0
                        ? ` ${name} ${timeLeft} осталось секунд`
                        : (
                            <>
                                {`Ты справился, ${name} 💪`}
                                <br />
                                <span style={{ fontSize: '1.2rem', color: '#27ae60', fontWeight: 500 }}>{phrase}</span>
                                <br />
                                <button
                                    type="button"
                                    style={{ marginTop: '20px', background: '#3498db', color: '#fff' }}
                                    onClick={handleReset}
                                >
                                    Попробовать снова
                                </button>
                            </>
                        )
                    }
                </div>
            ) : null}
        </div>
    );
}
