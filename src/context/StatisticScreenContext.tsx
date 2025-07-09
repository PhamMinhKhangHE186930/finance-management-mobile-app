import React, { createContext } from 'react';

export const StatisticScreenContext = createContext<any>(null);

function StatisticScreenProvider({ children }: { children: any }) {

    return (
        <div>StatisticScreenProvider</div>
    )
}

export default StatisticScreenProvider