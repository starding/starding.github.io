# Using Raw SQL in Django

## The ORM Is Not a Silver Bullet

In terms of features, Django's ORM is only a subset of SQL. That means there are many things SQL can do that the Django ORM can't, not to mention that SQL is even Turing-complete. For example, it wasn't until version 1.8 that Django gradually added control-flow constructs like `CASE`, `WHEN` and `IF`. Yet these are very common in certain kinds of table operations, such as reporting.

Fortunately, Django provides an interface for raw SQL, so you can use raw SQL to implement more complex features.

## SQL Control Flow: A CASE WHEN Example

Say we have an archive table, `archives`:

Fields:
- `number` archive number
- `type` archive type
- `status` archive status
- `company` company
- `branch_company` branch company

The requirement is to compute, for each `type` and each branch company, the total number of archives, the number of archives with `status=01`, and their share of the total.

Of course you could do this in a programming language, but it would be fairly involved. Here you can use a `CASE WHEN` statement to precisely control which values of the same field get selected.

```sql
SELECT 
      COUNT(CASE WHEN status='01' THEN status END) AS status_01,
      COUNT(*) AS total,
      CONCAT(FORMAT(COUNT(CASE WHEN status='01' THEN status END)/
      COUNT(*)*100, 2), '%') AS percentage
FROM
      archives
GROUP BY
      status, branch_company
```

That solves the problem above. Since this table was made up for the example, I won't show the results here.

## Chained Queries on Top of That
One very handy feature of Django's ORM is chained queries: you can keep chaining filter and similar methods to narrow down to exactly what you want.

This is especially useful in certain scenarios. With the table above, for example, sometimes you want data for a particular branch or sub-branch company, and sometimes data for a single type. Writing a separate SQL query for every combination of conditions gets very complicated, and sometimes there are a huge number of combinations. Chained queries solve this problem quite neatly.

To give raw SQL a simple form of chained querying, we need to keep appending condition clauses to the WHERE. A small class does the job:


```python
class GenQuerySQL(object):
    def __init__(self, table):
        self.table = table
        self.group_by_fields = " "
        self.where_conditions = " 1=1 "
        self.fields = " "
        self.order_by_fields = ""
    def where(self, where_condition):
        if where_condition:
            self.where_conditions += " and " + where_condition
        return self
    def add_field(self, fields):
        self.fields += " " + fields
        return self
    def group_by(self, group_by_field):
        self.group_by_fields = group_by_field
        return self
    def order_by(self, order_by_field):
        self.order_by_fields = order_by_field
        return self
    def sql(self):
        SQL = 'SELECT ' + self.fields + ' FROM ' + self.table + ' WHERE ' + self.where_conditions + ' GROUP BY ' + self.group_by_fields + ' ORDER BY ' + self.order_by_fields + ";"
        return SQL
```

This class gives a simple imitation of chained queries. For example:

```python
archive_statistics = GenQuerySQL('SOME_TABLE')
raw_sql = archive_statistics.add_field('fields').where('where_condition').group_by('group_by_fields').order_by('order_by_fields').sql()
```

Here `.where` can be chained multiple times. You could also do it another way: first build the WHERE clause from your conditions, then assemble the final SQL statement. The idea is the same: filter the conditions first, then query the database.


Huilongguan, Beijing, January 2016
