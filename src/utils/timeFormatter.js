import { formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';

class TimeFormatter {
    convertMinutesToLargestValue(minutes: number) {
        const duration = intervalToDuration({
            start: 0,
            end: minutes * 60 * 1000,
        });

        return formatDuration(duration, {
            format: ['years', 'months', 'days', 'hours', 'minutes'],
            locale: ru,
        });
    }
}

export const timeFormatter = new TimeFormatter();

export const getTimeLabel = (value, unit) => {
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
