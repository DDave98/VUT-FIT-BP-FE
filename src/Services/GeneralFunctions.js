/// funkce převede format MySQL datetime na format pro input type="date"
export function ConvertDate(date)
{
    if (date.includes("T"))
        return date.split("T")[0];
    else 
        return date.split(" ")[0];
}