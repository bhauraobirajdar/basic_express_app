module.exports = {
  getUsers: 'select id, emp_name, active from test_schema.emp where active=true order by id desc',
  addUser: 'INSERT into test_schema.emp(emp_name, password) values ($1, $2)',
  updateUser: 'UPDATE test_schema.emp SET emp_name = $1 where id = $2',
  deleteUser: 'UPDATE test_schema.emp SET active = $1 where id = $2',
  getUserByUserName: 'select * from test_schema.emp where emp_name = $1',
  
};
