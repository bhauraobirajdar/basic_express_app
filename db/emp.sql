CREATE TABLE test_schema.emp (
	id serial NOT NULL,
	emp_name varchar NULL,
	active bool NULL DEFAULT true,
	email varchar NULL,
	"password" varchar NULL
);