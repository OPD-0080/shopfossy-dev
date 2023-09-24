#   QUERY TO BE USED IN POSTGRES DATABASE

## DELETE ROWS
    1.  for all rows  
            QUERY:  DELETE FROM <table name> 
    2.  for some rows by ids
            QUERY:  DELETE FROM <table name> WHERE id = <id number>

            note: this will delete that value but id WILL NOT BE UPDATED 

            TO UPDATE SEQUENCE ID FOR A TABLE AND RESTART ID INCREMENT FROM 1
                query:     ALTER SEQUENCE <table sequence name> RESTART;
                        UPDATE <table name> SET id = DEFAULT; 