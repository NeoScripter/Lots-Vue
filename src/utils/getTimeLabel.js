function getTimeLabel(value, unit) {
    const pluralRules = new Intl.PluralRules("ru");

    const forms = {
        minute: ["минута", "минуты", "минут"],
        hour: ["час", "часа", "часов"],
        day: ["день", "дня", "дней"],
    };

    const rule = pluralRules.select(value); 

    if (rule === "one") return `${value} ${forms[unit][0]}`;
    if (rule === "few") return `${value} ${forms[unit][1]}`;
    return `${value} ${forms[unit][2]}`; 
};

export function calculateActuality(days, hours, minutes) {
    if (days > 0) {
        return getTimeLabel(days, "day");
    } else if (hours) {
        return getTimeLabel(hours, "hour");
    } else {
        return getTimeLabel(minutes, "minute");
    }
}