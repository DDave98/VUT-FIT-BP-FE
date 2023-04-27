import "./DetailRow.css";

const DetailDataRow = ({header, children}) =>
{
    return (
        <div className="DetailDataRow">
            <h6 className="DetailDataRow">{header}</h6>
             {children}
        </div>
    );
}

export default DetailDataRow;