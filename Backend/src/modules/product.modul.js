const pool = require('../../db/db.js')
const format = require('pg-format')







const getProductsPaginacion = async(order_by = 'id_ASC', limit=6, page=1) =>{
    const OrderBySQL = order_by.replace('_', '');
    



    const offset = (page-1) * limit;

    const query = format(
        'SELECT * from produts order by %s limit %s offset %s',
        OrderBySQL,
        limit,
        offset
    );
    const {rows} = await pool.query(query)
    return rows

}


module.exports = {getProductsPaginacion}
