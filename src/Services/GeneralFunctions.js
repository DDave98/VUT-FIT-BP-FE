/// funkce převede format MySQL datetime na format pro input type="date"
export function ConvertDate(date)
{
    var newDate = date.split("T")[0];
    //console.log("new date: ", newDate);
    return newDate;
}