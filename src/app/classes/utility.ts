export class Utility {

    // Date Format
    // Receives a timestamp and returns a date with the following format:
    // Day Month, Year: 3rd July, 2017
    public static timestampToDate(timeStamp: any) {
        var fortnightAway = new Date(timeStamp + 24 * 60 * 60 * 1000);
        var date = fortnightAway.getDate();
        var months = "January,February,March,April,May,June,July,August,September,October,November,December";
        var myMonth = months.split(",")[fortnightAway.getMonth()];

        return "Release date: " + date + Utility.nth(date) + " " + myMonth + ", " + fortnightAway.getFullYear();
    }

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
