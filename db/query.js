module.exports = {
  GET_USERS:
    'select id, emp_name, active from test_schema.emp where active=true order by id desc',
  ADD_USER: 'INSERT into test_schema.emp(emp_name, password) values ($1, $2)',
  UPDATE_USER: 'UPDATE test_schema.emp SET emp_name = $1 where id = $2',
  DELETE_USER: 'UPDATE test_schema.emp SET active = $1 where id = $2',
  GET_USER_BY_NAME: 'select * from test_schema.emp where emp_name = $1',
  GET_ALL_EMP: 'select * from  test_schema.emp',
}
