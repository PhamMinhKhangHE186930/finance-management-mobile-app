const formatDate = (location: string, date: Date): string => {
    const formatter = Intl.DateTimeFormat(location, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const formatDate = formatter.format(date);
    return formatDate;
}

const formatMoney = (location: string, amount: number): string => {
    const formatter = Intl.NumberFormat(location, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    })

    return formatter.format(amount);
}

const stringToNumberMoney = (amount: string): number => {
    if (amount) {
        const preAmount = amount.replace(/\./g, '');
        return parseInt(preAmount);
    }
    
    return 0;
}

export { formatDate, formatMoney, stringToNumberMoney };
