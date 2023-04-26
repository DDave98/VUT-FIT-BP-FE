import "./DetailDataRow.css";

const DetailDataRow = ({header, children}) =>
{
    return (
        <div className="DetailDataRow">
            <h6>{header}</h6>
             {children}
        </div>
    );
}

export default DetailDataRow;