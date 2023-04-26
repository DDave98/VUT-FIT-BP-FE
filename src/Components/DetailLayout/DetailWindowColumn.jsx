import "./DetailWindowColumn.css";

const DetailWindowColumn = ({psize, children}) =>
{
    return (
        <div className="DetailWindowColumn" style={{width: psize}}>
            {children}
        </div>
    );
}

export default DetailWindowColumn;