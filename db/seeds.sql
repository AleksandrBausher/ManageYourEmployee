INSERT INTO department (name)
VALUES ("Accounting"),
       ("Operations"),
       ("QA"),
       ("R&D");



INSERT INTO role (title, salary, department_id)
VALUES ("Graphic Designer",40000.00,3),
       ("Financial Analyst",60000.00,2),
       ("Sales Executive",80000.00,1),
       ("Web Developer",140000.00,1),
       ("Content Writer",110000.00,4)
       ("Business Analyst",12000.00,3),
       ("Quality Assurance Analyst",200000.00,4),
       ("Legal Counsel",560000.00,1);



INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("Samuel","Johnson",1,1),
       ( "Harper","Williams",2,2),
       ( "Abigail","Brown",3,3),
       ( "Ava","Smith",4,7),
       ( "Mia","Garcia",5,1),
       ( "Daniel","Ramirez",6,NULL),
       ( "Jacob","Gonzalez",7,2),
       ( "Abigail","Carter",8,NULL);