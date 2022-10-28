import PropTypes from 'prop-types';
import "../Styles/TableView.css";
import { Header, Table, Rating } from 'semantic-ui-react'

const TableView = (
{
    data,
    onPage,
    page
}) =>
{
    const GetTableBody = () =>
    {
        const bodyData =  data.map( (item) =>
        {
            <Table.Row key={item[0]}>
            {
                Object.values(item).map( (value) =>
                {
                    <Table.Cell key={""}>
                        {value}
                    </Table.Cell>
                })
            }
                <Table.HeaderCell>
                        <button>více informací</button>
                </Table.HeaderCell>
            </Table.Row>
        })
        console.log(bodyData)
        return bodyData;
    }

    return (
        <div className='TableViewContainer'>
            <Table celled padded>
                <Table.Header>
                <Table.Row>
                    {
                        Object.keys(data[0]).map((key) =>
                            <Table.HeaderCell>
                                {key}
                            </Table.HeaderCell>
                        )
                    }
                    <Table.HeaderCell>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        GetTableBody()
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

TableView.propTypes = 
{
    data: PropTypes.array,
    onPage: PropTypes.number,
    page: PropTypes.number,
}

export default TableView;