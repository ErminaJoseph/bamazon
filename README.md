# bamazon
This app acts as a mock amazon.com site.  It includes two tables within the bamazon database, products and departments.  

The first file, bamazonCustomer, allows the customer to view the products available and make a purchase by selecting the item ID of the product they like to purchase and how much they'd like to buy.  If the client requests more than what is available, the app will advise that this is an insufficient quantity.  If the client requests an amount less than or equal to the quantity available, the request will do through and the total cost will be provided to the quantity.  Also, the products table will update to reflect new stock quantity.

The second file, bamazonManager, allows the manager to view the products, view the any items that are low in stock within,add increase the stock quantity for an item,  add a new product to the products table.

The third file, bamazonSupervisor, allows a supervisor to view the profits per department which was coded by joining the department and products table.  They also can add a new department to the departments table.