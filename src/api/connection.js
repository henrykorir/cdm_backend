import mysql from 'mysql' 

const connection = mysql.createConnection({
  host: '142.93.103.37',
  user: 'test_user',
  password: 'Eek6FEuxS7Y8IGlV@2021',
  database: 'testDB'
})

export default connection