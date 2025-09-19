import { useState, useEffect } from 'react';

interface CounterConfig {
    startValue: number;
    endValue: number;
    duration: number; // in milliseconds
    autoStart?: boolean;
}

interface CounterState {
    count: number;
    isAnimating: boolean;
    isComplete: boolean;
}

export function useCounter(config: CounterConfig) {
    const { startValue, endValue, duration, autoStart = true } = config;

    const [state, setState] = useState<CounterState>({
        count: startValue,
        isAnimating: autoStart,
        isComplete: false
    });

    const start = () => {
        setState(prev => ({
            ...prev,
            count: startValue,
            isAnimating: true,
            isComplete: false
        }));
    };

    const stop = () => {
        setState(prev => ({
            ...prev,
            isAnimating: false
        }));
    };

    const reset = () => {
        setState({
            count: startValue,
            isAnimating: false,
            isComplete: false
        });
    };

    useEffect(() => {
        if (!state.isAnimating) return;

        const totalSteps = Math.ceil((endValue - startValue) / 1); // Use 1 as base increment
        const interval = duration / totalSteps;
        const increment = (endValue - startValue) / totalSteps;

        const timer = setInterval(() => {
            setState(prev => {
                const nextValue = prev.count + increment;

                if (nextValue >= endValue) {
                    clearInterval(timer);
                    return {
                        count: endValue,
                        isAnimating: false,
                        isComplete: true
                    };
                }

                return {
                    ...prev,
                    count: nextValue
                };
            });
        }, interval);

        return () => clearInterval(timer);
    }, [state.isAnimating, startValue, endValue, duration]);

    return {
        count: Math.round(state.count),
        isAnimating: state.isAnimating,
        isComplete: state.isComplete,
        start,
        stop,
        reset
    };
}
