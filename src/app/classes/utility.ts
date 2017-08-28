export class Utility {

    // timestampToDate
    // Receives a timestamp and returns a date with the following format:
    // Day Month, Year: 3rd July, 2017
    // IGDB
    public static timestampToDate(timeStamp: any) {
        var fortnightAway = new Date(timeStamp + 24 * 60 * 60 * 1000);
        var date = fortnightAway.getDate();
        var months = "January,February,March,April,May,June,July,August,September,October,November,December";
        var myMonth = months.split(",")[fortnightAway.getMonth()];

        return date + Utility.nth(date) + " " + myMonth + ", " + fortnightAway.getFullYear();
    }

    // dateToFormat
    // Receives a SQL date and returns the date with the following format:
    // From "2018-05-05T00:00:00" to 5th May, 2018
    public static dateToFormat(timeDate: any) {
        var fortnightAway = new Date(timeDate);
        var date = fortnightAway.getDate();
        var months = "January,February,March,April,May,June,July,August,September,October,November,December";
        var myMonth = months.split(",")[fortnightAway.getMonth()];

        return date + Utility.nth(date) + " " + myMonth + ", " + fortnightAway.getFullYear();
    }

    // returns the appropiate suffix
    static nth(d) {
        if (d > 3 && d < 21) return 'th'; // thanks kennebec
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
}
