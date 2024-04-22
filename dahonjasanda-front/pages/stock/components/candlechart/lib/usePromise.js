import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (options === null) {
            const newOptions = {
                chart: {
                    width: '100%',
                    height: '600px',
                    type: 'candlestick',
                },
                labels: labels,
                series: series,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                }],
            };
            setOptions(newOptions);
        }
    }, []);

    return [options];

}